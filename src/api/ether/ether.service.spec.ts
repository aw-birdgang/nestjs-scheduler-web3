import { Test, TestingModule } from '@nestjs/testing';
import { EtherService } from './ether.service';

describe('EtherService', () => {
  let service: EtherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtherService],
    }).compile();

    service = module.get<EtherService>(EtherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
