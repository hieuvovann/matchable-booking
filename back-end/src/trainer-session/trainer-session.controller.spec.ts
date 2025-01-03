import { Test, TestingModule } from '@nestjs/testing';
import { TrainerSessionController } from './trainer-session.controller';

describe('TrainerSessionController', () => {
  let controller: TrainerSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainerSessionController],
    }).compile();

    controller = module.get<TrainerSessionController>(TrainerSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
