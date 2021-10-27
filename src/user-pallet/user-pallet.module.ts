import { Module } from '@nestjs/common';
import { UserpalletService } from './user-pallet.service';
import { UserPalletController } from './user-pallet.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [UserPalletController],
  providers: [UserpalletService, PrismaService, UsersService],
})
export class UserPalletModule {}
