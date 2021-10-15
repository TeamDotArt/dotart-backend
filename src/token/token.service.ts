import { Prisma, Token } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Token[]> {
    return this.prisma.token.findMany();
  }

  async remove(userId: string): Promise<Token> {
    return this.prisma.token.delete({
      where: { userId: userId },
    });
  }
}
