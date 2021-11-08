import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../common/prisma.service';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, TokenService],
})
export class UsersModule {}
