import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { UsersService } from 'src/users/users.service';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService, PrismaService, UsersService],
})
export class TokenModule {}
