import { Test, TestingModule } from '@nestjs/testing';
import { ReplenishController } from './replenish.controller';
import { ReplenishService } from './replenish.service';

describe('ReplenishController', () => {
  let controller: ReplenishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplenishController],
      providers: [ReplenishService],
    }).compile();

    controller = module.get<ReplenishController>(ReplenishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
