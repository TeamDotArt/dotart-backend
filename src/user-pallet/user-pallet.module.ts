import { Module } from '@nestjs/common';
import { UserpalletService } from './user-pallet.service';
import { UserPalletController } from './user-pallet.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [UserPalletController],
  providers: [UserpalletService, PrismaService, UsersService, TokenService],
})
export class UserPalletModule {}
