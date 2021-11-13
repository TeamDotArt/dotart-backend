import { Module } from '@nestjs/common';
import { BasicPalletService } from './basic-pallet.service';
import { BasicPalletController } from './basic-pallet.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';

@Module({
  controllers: [BasicPalletController],
  providers: [
    { provide: 'BasicPalletServiceInterface', useClass: BasicPalletService },
    PrismaService,
    UsersService,
    TokenService,
  ],
})
export class BasicPalletModule {}
