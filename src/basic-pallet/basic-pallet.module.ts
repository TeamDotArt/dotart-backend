import { Module } from '@nestjs/common';
import { BasicPalletService } from './basic-pallet.service';
import { BasicPalletController } from './basic-pallet.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [BasicPalletController],
  providers: [BasicPalletService, PrismaService],
})
export class BasicPalletModule {}
