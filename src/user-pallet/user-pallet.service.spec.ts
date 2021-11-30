import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { UserPalletService } from './user-pallet.service';
import { TokenService } from '../token/token.service';
import { RoleGuard } from '../auth/guards/role.guard';

describe('UserPalletService', () => {
  let service: UserPalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPalletService,
        PrismaService,
        { provide: 'UsersServiceInterface', useClass: UsersService },
        { provide: 'TokenServiceInterface', useClass: TokenService },
      ],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    service = module.get<UserPalletService>(UserPalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
