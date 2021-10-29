import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/common/prisma.service';
import { TokenService } from 'src/token/token.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, TokenService],
})
export class UsersModule {}
