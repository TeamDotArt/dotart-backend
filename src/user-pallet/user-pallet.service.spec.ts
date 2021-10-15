import { Test, TestingModule } from '@nestjs/testing';
import { UserpalletService } from './user-pallet.service';

describe('UserPalletService', () => {
  let service: UserpalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserpalletService],
    }).compile();

    service = module.get<UserpalletService>(UserpalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
