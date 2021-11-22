import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';

@Module({
  providers: [
    { provide: 'TokenServiceInterface', useClass: TokenService },
    { provide: 'UsersServiceInterface', useClass: UsersService },
    PrismaService,
  ],
})
export class TokenModule {}
