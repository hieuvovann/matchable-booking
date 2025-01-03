import { Controller, Get } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { AccountVerified } from '@/auth/decorators/account-verified';
import { TrainerEntity } from './entities/trainer.entity';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @AccountVerified('jwt')
  @Get()
  getTrainers(): Promise<TrainerEntity[]> {
    return this.trainersService.findAllTrainers();
  }
}
