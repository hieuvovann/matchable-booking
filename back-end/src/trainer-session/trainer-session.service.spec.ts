import { Test, TestingModule } from '@nestjs/testing';
import { TrainerSessionService } from './trainer-session.service';

describe('TrainerSessionService', () => {
  let service: TrainerSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainerSessionService],
    }).compile();

    service = module.get<TrainerSessionService>(TrainerSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
