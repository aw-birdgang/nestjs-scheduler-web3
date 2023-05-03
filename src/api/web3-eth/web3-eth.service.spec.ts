import { Test, TestingModule } from '@nestjs/testing';
import { Web3EthService } from './web3-eth.service';

describe('Web3EthService', () => {
  let service: Web3EthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Web3EthService],
    }).compile();

    service = module.get<Web3EthService>(Web3EthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
