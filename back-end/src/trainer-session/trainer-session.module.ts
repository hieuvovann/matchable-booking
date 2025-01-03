import { Module } from '@nestjs/common';
import { TrainerSessionController } from './trainer-session.controller';
import { TrainerSessionService } from './trainer-session.service';

@Module({
  controllers: [TrainerSessionController],
  providers: [TrainerSessionService],
})
export class TrainerSessionModule {}
