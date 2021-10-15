import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [PrismaService],
})
export class CommonModule {}
