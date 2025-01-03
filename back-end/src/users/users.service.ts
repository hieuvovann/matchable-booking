import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDTO } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<UserEntity> {
    return this.userRepository.save({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
    });
  }

  countUsers(): Promise<number> {
    return this.userRepository.count();
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({
      email: email?.toLowerCase(),
    });
  }

  findUserById(userId: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id: userId });
  }
}
