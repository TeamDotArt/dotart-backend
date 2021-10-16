import { Module } from '@nestjs/common';
import { UserpalletService } from './user-pallet.service';
import { UserPalletController } from './user-pallet.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [UserPalletController],
  providers: [UserpalletService, PrismaService],
})
export class UserPalletModule {}
