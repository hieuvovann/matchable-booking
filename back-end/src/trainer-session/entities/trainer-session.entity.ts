import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { TrainerEntity } from '@/trainers/entities/trainer.entity';
import { SessionEntity } from '@/sessions/entities/session.entity';
import { BookingEntity } from '@/bookings/entites/booking.entity';

@Entity({ name: 'trainer-session' })
@Unique(['trainer', 'session'])
export class TrainerSessionEntity extends GenericEntity {
  @ManyToOne(() => TrainerEntity, (trainer) => trainer.trainerSessions)
  @JoinColumn({ name: 'trainerId' })
  trainer: TrainerEntity;

  @ManyToOne(() => SessionEntity, (session) => session.trainerSessions)
  @JoinColumn({ name: 'sessionId' })
  session: SessionEntity;

  @OneToMany(() => BookingEntity, (booking) => booking.trainerSession)
  bookings: BookingEntity[];

  @Column('decimal', { precision: 10, scale: 2 })
  costPerHour: number;
}
