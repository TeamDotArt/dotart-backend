import { Injectable } from '@nestjs/common';
// Service
import { PrismaService } from '../common/prisma.service';
// Helper
import { generateEmailToken } from '../common/helpers/activationCodeHelper';
// Dto
import { RemoveTokenResponse } from './dto/remove-token.dto';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

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
   * PasswordTokenからUserIdを取得する
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
   * AccessTokenをセットする
   */
  async setAccessToken(accessToken: string, userId: string): Promise<string> {
    await this.prisma.token.upsert({
      where: { userId: userId },
      update: {
        token: accessToken,
      },
      create: {
        userId: userId,
        token: accessToken,
      },
    });
    return accessToken;
  }

  /**
   * PasswordTokenをセットする
   */
  async setPasswordToken(
    userId: string,
    passwordToken: string | null,
  ): Promise<string> {
    const token = await this.prisma.token.update({
      where: { userId: userId },
      data: { passwordToken: passwordToken },
    });
    return token.passwordToken;
  }

  /**
   * UserIdからトークンを削除する
   */
  async removeTokenByUserId(userId: string): Promise<RemoveTokenResponse> {
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
