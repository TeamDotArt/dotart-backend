import { Module } from '@nestjs/common';
import { UserpalletService } from './userpallet.service';
import { UserpalletController } from './userpallet.controller';
import { PrismaService } from './../prisma.service';
@Module({
  controllers: [UserpalletController],
  providers: [UserpalletService, PrismaService],
})
export class UserpalletModule {}
