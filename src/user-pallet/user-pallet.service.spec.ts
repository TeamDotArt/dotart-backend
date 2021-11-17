import { Test, TestingModule } from '@nestjs/testing';
import { UserPalletService } from './user-pallet.service';

describe('UserPalletService', () => {
  let service: UserPalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPalletService],
    }).compile();

    service = module.get<UserPalletService>(UserPalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
