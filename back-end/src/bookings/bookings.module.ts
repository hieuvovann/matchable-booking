import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entites/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
