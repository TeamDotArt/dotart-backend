import { Module } from '@nestjs/common';
import { BasicPalletService } from './basic-pallet.service';
import { BasicPalletController } from './basic-pallet.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [BasicPalletController],
  providers: [
    { provide: 'BasicPalletServiceInterface', useClass: BasicPalletService },
    { provide: 'TokenServiceInterface', useClass: TokenService },
    { provide: 'UsersServiceInterface', useClass: UsersService },
    PrismaService,
  ],
})
export class BasicPalletModule {}
