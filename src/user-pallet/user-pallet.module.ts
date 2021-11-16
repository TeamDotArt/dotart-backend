import { Module } from '@nestjs/common';
import { UserPalletService } from './user-pallet.service';
import { UserPalletController } from './user-pallet.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';

@Module({
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
})
export class UserPalletModule {}
