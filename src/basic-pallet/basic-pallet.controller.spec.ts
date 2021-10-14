import { Test, TestingModule } from '@nestjs/testing';
import { BasicPalletController } from './basic-pallet.controller';
import { BasicPalletService } from './basic-pallet.service';

describe('BasicPalletController', () => {
  let controller: BasicPalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicPalletController],
      providers: [BasicPalletService],
    }).compile();

    controller = module.get<BasicPalletController>(BasicPalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
