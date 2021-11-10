import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { UserpalletService } from './user-pallet.service';
import { TokenService } from '../token/token.service';

describe('UserPalletService', () => {
  let service: UserpalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserpalletService, PrismaService, UsersService, TokenService],
    }).compile();

    service = module.get<UserpalletService>(UserpalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
