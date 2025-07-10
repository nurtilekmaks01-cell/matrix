import { Test, TestingModule } from '@nestjs/testing';
import { KeyupController } from './keyup.controller';
import { KeyupService } from './keyup.service';

describe('KeyupController', () => {
  let controller: KeyupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyupController],
      providers: [KeyupService],
    }).compile();

    controller = module.get<KeyupController>(KeyupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
