import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { TrainerSessionEntity } from '@/trainer-session/entities/trainer-session.entity';

@Entity({ name: 'sessions' })
export class SessionEntity extends GenericEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(
    () => TrainerSessionEntity,
    (trainerSession) => trainerSession.session,
  )
  trainerSessions: TrainerSessionEntity[];
}
