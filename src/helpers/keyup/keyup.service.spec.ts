import { Test, TestingModule } from '@nestjs/testing';
import { KeyupService } from './keyup.service';

describe('KeyupService', () => {
  let service: KeyupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyupService],
    }).compile();

    service = module.get<KeyupService>(KeyupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
