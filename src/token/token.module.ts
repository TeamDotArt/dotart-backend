import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService, PrismaService, UsersService],
})
export class TokenModule {}
