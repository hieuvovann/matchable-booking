import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { TrainerSessionEntity } from '@/trainer-session/entities/trainer-session.entity';

@Entity({ name: 'trainers' })
export class TrainerEntity extends GenericEntity {
  @Column({ nullable: false })
  name: string;

  @OneToMany(
    () => TrainerSessionEntity,
    (trainerSession) => trainerSession.trainer,
  )
  trainerSessions: TrainerSessionEntity[];
}
