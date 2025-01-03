import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { BookingEntity } from '@/bookings/entites/booking.entity';

@Entity({ name: 'users' })
export class UserEntity extends GenericEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => BookingEntity, (booking) => booking.user)
  bookings: BookingEntity[];
}
