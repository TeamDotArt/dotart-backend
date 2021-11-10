import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { UserPalletController } from './user-pallet.controller';
import { UserpalletService } from './user-pallet.service';
import { TokenService } from '../token/token.service';

describe('UserPalletController', () => {
  let controller: UserPalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPalletController],
      providers: [UserpalletService, PrismaService, UsersService, TokenService],
    }).compile();

    controller = module.get<UserPalletController>(UserPalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
