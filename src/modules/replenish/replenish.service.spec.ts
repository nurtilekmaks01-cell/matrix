import { Test, TestingModule } from '@nestjs/testing';
import { ReplenishService } from './replenish.service';

describe('ReplenishService', () => {
  let service: ReplenishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplenishService],
    }).compile();

    service = module.get<ReplenishService>(ReplenishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
