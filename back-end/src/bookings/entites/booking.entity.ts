import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { TrainerSessionEntity } from '@/trainer-session/entities/trainer-session.entity';
import { UserEntity } from '@/users/entities/user.entity';

@Entity({ name: 'bookings' })
export class BookingEntity extends GenericEntity {
  @ManyToOne(() => UserEntity, (user) => user.bookings)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @Column('int', { nullable: false })
  userId: number;

  @ManyToOne(
    () => TrainerSessionEntity,
    (trainerSession) => trainerSession.bookings,
  )
  @JoinColumn({ name: 'trainerSessionId' })
  trainerSession: TrainerSessionEntity;
  @Column('int', { nullable: false })
  trainerSessionId: number;

  @Column('timestamp', { nullable: false })
  startDate: Date;

  @Column('int', { nullable: false })
  duration: number; // duration in hours
}
