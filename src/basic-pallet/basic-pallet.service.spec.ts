import { Test, TestingModule } from '@nestjs/testing';
import { BasicPalletService } from './basic-pallet.service';

describe('BasicPalletService', () => {
  let service: BasicPalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicPalletService],
    }).compile();

    service = module.get<BasicPalletService>(BasicPalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
