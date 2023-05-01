import { Test, TestingModule } from '@nestjs/testing';
import { EtherController } from './ether.controller';

describe('EtherController', () => {
  let controller: EtherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtherController],
    }).compile();

    controller = module.get<EtherController>(EtherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
