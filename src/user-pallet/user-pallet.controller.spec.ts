import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { UserPalletController } from './user-pallet.controller';
import { UserPalletService } from './user-pallet.service';

describe('UserPalletController', () => {
  let controller: UserPalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPalletController],
      providers: [
        {
          provide: 'UserPalletServiceInterface',
          useClass: UserPalletService,
        },
        { provide: 'UsersServiceInterface', useClass: UsersService },
        { provide: 'TokenServiceInterface', useClass: TokenService },
        PrismaService,
      ],
    }).compile();

    controller = module.get<UserPalletController>(UserPalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
