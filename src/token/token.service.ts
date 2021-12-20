import { Injectable } from '@nestjs/common';
// Service
import { PrismaService } from '../common/prisma.service';
// Helper
import { generateEmailToken } from '../common/helpers/activationCodeHelper';
// Dto
import { RemoveTokenResponse } from './dto/remove-token.dto';
import { AccessTokenResponse } from './dto/access-token.dto';
import { RefreshTokenResponse } from './dto/refresh-token.dto';
import { EmailTokenResponse } from './dto/email-token.dto';
import { UserIdResponse } from './dto/user-id.dto';
import { PasswordTokenResponse } from './dto/password-token.dto';
import { TokenServiceInterface } from './interface/token.service.interface';

@Injectable()
export class TokenService implements TokenServiceInterface {
  constructor(private readonly _prismaService: PrismaService) {}

  /**
   * UserIdからtokenを取得する
   */
  async getToken(userId: string): Promise<AccessTokenResponse> {
    const findToken = await this._prismaService.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return { token: findToken.token };
  }

  /**
   * UserIdからrefreshTokenを取得する
   */
  async getRefreshToken(userId: string): Promise<RefreshTokenResponse> {
    const findToken = await this._prismaService.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return { refreshToken: findToken.refreshToken };
  }

  /**
   * UserIdからEmailTokenを取得する
   */
  async getEmailToken(userId: string): Promise<EmailTokenResponse> {
    const findToken = await this._prismaService.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return { emailToken: findToken.emailToken };
  }

  /**
   * EmailTokenからUserIdを取得する
   */
  async getUserIdByEmailToken(emailToken: string): Promise<UserIdResponse> {
    const findToken = await this._prismaService.token.findUnique({
      where: {
        emailToken: emailToken,
      },
    });
    return { userId: findToken.userId };
  }

  /**
   * PasswordTokenからUserIdを取得する
   */
  async getUserIdByPasswordToken(
    passwordToken: string,
  ): Promise<UserIdResponse> {
    const findToken = await this._prismaService.token.findUnique({
      where: {
        passwordToken: passwordToken,
      },
    });
    return { userId: findToken.userId };
  }

  /**
   * UserIdからPasswordTokenを取得する
   */
  async getPasswordToken(userId: string): Promise<PasswordTokenResponse> {
    const findToken = await this._prismaService.token.findUnique({
      where: {
        userId: userId,
      },
    });
    return { passwordToken: findToken.passwordToken };
  }

  /**
   * EmailTokenを生成する
   */
  async createEmailToken(userId: string): Promise<EmailTokenResponse> {
    const emailToken = generateEmailToken();
    const token = await this._prismaService.token.create({
      data: {
        userId: userId,
        emailToken: emailToken,
      },
    });
    return { emailToken: token.emailToken };
  }

  /**
   * AccessTokenをセットする
   */
  async setAccessToken(
    accessToken: string,
    userId: string,
  ): Promise<AccessTokenResponse> {
    await this._prismaService.token.upsert({
      where: { userId: userId },
      update: {
        token: accessToken,
      },
      create: {
        userId: userId,
        token: accessToken,
      },
    });
    return { token: accessToken };
  }

  /**
   * PasswordTokenをセットする
   */
  async setPasswordToken(
    userId: string,
    passwordToken: string | null,
  ): Promise<PasswordTokenResponse> {
    const token = await this._prismaService.token.update({
      where: { userId: userId },
      data: { passwordToken: passwordToken },
    });
    return { passwordToken: token.passwordToken };
  }

  /**
   * UserIdからトークンを削除する
   */
  async removeTokenByUserId(userId: string): Promise<RemoveTokenResponse> {
    await this._prismaService.token.delete({
      where: { userId: userId },
    });

    return {
      status: 201,
      message: 'Tokenを削除しました。',
      userId: userId,
    };
  }
}
