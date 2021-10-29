import { Token } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { generateEmailToken } from 'src/common/helpers/activationCodeHelper';

// TODO: Token操作をこちらで行うようにする
@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  /**
   * UserIdからtokenを取得する
   */
  async getTokenByUserId(userId: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return findToken.token;
  }

  /**
   * UserIdからrefreshTokenを取得する
   */
  async getRefreshTokenByUserId(userId: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return findToken.refreshToken;
  }

  /**
   * UserIdからEmailTokenを取得する
   */
  async getEmailTokenByUserId(userId: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return findToken.emailToken;
  }

  /**
   * EmailTokenからUserIdを取得する
   */
  async getUserIdByEmailToken(emailToken: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        emailToken: emailToken,
      },
    });
    return findToken.userId;
  }

  /**
   * UserIdからPasswordTokenを取得する
   */
  async getUserIdByPasswordToken(passwordToken: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        passwordToken: passwordToken,
      },
    });
    return findToken.userId;
  }

  /**
   * UserIdからPasswordTokenを取得する
   */
  async getPasswordTokenByUserId(userId: string): Promise<string> {
    const findToken = await this.prisma.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return findToken.passwordToken;
  }

  /**
   * Tokenを生成する
   */
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

  /**
   * EmailTokenを生成する
   */
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

  /**
   * UserIdからトークンを削除する
   */
  async removeTokenByUserId(userId: string) {
    await this.prisma.token.delete({
      where: { userId: userId },
    });

    return {
      status: 201,
      message: 'Tokenを削除しました。',
      userId: userId,
    };
  }
}
