import { Module } from '@nestjs/common';
import { BasicPalletService } from './basic-pallet.service';
import { BasicPalletController } from './basic-pallet.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [BasicPalletController],
  providers: [BasicPalletService, PrismaService, UsersService],
})
export class BasicPalletModule {}
