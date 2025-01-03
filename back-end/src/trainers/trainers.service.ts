import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainerEntity } from './entities/trainer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(TrainerEntity)
    private readonly trainerRepository: Repository<TrainerEntity>,
  ) {}

  async findAllTrainers(): Promise<TrainerEntity[]> {
    return this.trainerRepository.find();
  }
}
