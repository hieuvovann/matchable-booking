import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entites/booking.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { TrainerSessionEntity } from '@/trainer-session/entities/trainer-session.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async findBookings(userId: number): Promise<BookingEntity[]> {
    const query = this.bookingRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.user', 'u')
      .leftJoinAndSelect('b.trainerSession', 'ts')
      .leftJoinAndSelect('ts.trainer', 't')
      .leftJoinAndSelect('ts.session', 's')
      .andWhere('u.id = :userId', { userId });

    const result = await query.getMany();
    return result.map((booking) => ({
      ...booking,
      user: null,
    }));
  }

  async createBookings(
    userId: number,
    bookings: CreateBookingDTO[],
  ): Promise<any> {
    await this.bookingRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        for (const bookingData of bookings) {
          const startDate = new Date(bookingData.startDate);
          const endDate = new Date(
            startDate.getTime() + bookingData.duration * 60 * 60 * 1000,
          );
  
          // Find the trainerSessionId using trainerId and sessionId
          const trainerSession = await transactionalEntityManager
            .createQueryBuilder()
            .select('ts.id')
            .from(TrainerSessionEntity, 'ts')
            .where('ts.trainerId = :trainerId', { trainerId: bookingData.trainerId })
            .andWhere('ts.sessionId = :sessionId', { sessionId: bookingData.sessionId })
            .getOne();
          
          if (!trainerSession) {
            throw new Error(
              `Trainer session not found for trainerId: ${bookingData.trainerId} and sessionId: ${bookingData.sessionId}`,
            );
          }

          // Check for overlapping bookings
          const overlap = await transactionalEntityManager
            .createQueryBuilder(BookingEntity, 'b')
            .where('b.trainerSessionId = :trainerSessionId', {
              trainerSessionId: trainerSession.id,
            })
            .andWhere(
              '(b.startDate < :endDate AND b.startDate >= :startDate)',
              { startDate, endDate },
            )
            .orWhere(
              "(b.startDate <= :startDate AND b.startDate + b.duration * INTERVAL '1 HOUR' > :startDate)",
              { startDate, endDate },
            )
            .getOne();

          if (overlap) {
            throw new ConflictException(JSON.stringify(bookingData), {
              cause: new Error(),
              description: `Time overlap detected for booking with startDate: ${startDate.toISOString()}`,
            });
          }

          // Create the booking
          const booking = transactionalEntityManager.create(BookingEntity, {
            ...bookingData,
            userId,
            trainerSessionId: trainerSession.id,
          });

          await transactionalEntityManager.save(booking);
        }
      },
    );
  }
}
