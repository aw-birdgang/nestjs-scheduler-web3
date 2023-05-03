import { Test, TestingModule } from '@nestjs/testing';
import { Web3EthController } from './web3-eth.controller';

describe('Web3EthController', () => {
  let controller: Web3EthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Web3EthController],
    }).compile();

    controller = module.get<Web3EthController>(Web3EthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
