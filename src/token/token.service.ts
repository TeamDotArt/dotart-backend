import { Prisma, Token } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { generateEmailToken } from 'src/common/helpers/activationCodeHelper';

// TODO: Token操作をこちらで行うようにする
@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async getTokenByUserId(userId: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return findToken.token;
  }

  async getRefreshTokenByUserId(userId: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return findToken.refreshToken;
  }

  async getEmailTokenByUserId(userId: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return findToken.emailToken;
  }

  async getUserIdByEmailToken(emailToken: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        emailToken: emailToken,
      },
    });
    return findToken.userId;
  }

  async getUserIdByPasswordToken(passwordToken: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        passwordToken: passwordToken,
      },
    });
    return findToken.userId;
  }

  async getPasswordTokenByUserId(userId: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return findToken.passwordToken;
  }

  async createToken(payload: PayloadDto): Promise<string> {
    const accessToken = this.jwtService.sign(payload);
    await this.prisma.token.upsert({
      where: { userId: payload.userId },
      update: {
        token: accessToken,
      },
      create: {
        userId: payload.userId,
        token: accessToken,
      },
    });
    return accessToken;
  }

  async createEmailToken(userId: string): Promise<string> {
    const emailToken = generateEmailToken();
    const token = await this.prisma.token.create({
      data: {
        userId: userId,
        emailToken: emailToken,
      },
    });
    return token.emailToken;
  }

  async removeTokenByUserId(userId: string): Promise<Token> {
    return this.prisma.token.delete({
      where: { userId: userId },
    });
  }
}
