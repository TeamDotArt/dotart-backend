import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import jwt_decode from 'jwt-decode';
// サービス
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { PrismaService } from 'src/common/prisma.service';
// ヘルパー
import { compare, getHash } from '../common/helpers/cipherHelper';
import { generateEmailToken } from 'src/common/helpers/activationCodeHelper';
import { sendEmailToken } from 'src/common/sendgrid.service';
// Dto系
import { DecodedDto } from 'src/auth/dto/decoded.dto';
import { VerifyEmailResponse } from './dto/verify-email.dto';
import { PayloadDto } from './dto/payload.dto';
import { LogOutUserResponse } from './dto/logout-auth.dto';
import { ConfirmedUserResponse } from './dto/confirmed-user.dto';
import {
  LogInUserRequest,
  LogInUserResponse,
  ValidateUserResponse,
} from './dto/login-auth.dto';
// Entity
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private prisma: PrismaService,
  ) {}

  // ユーザーを認証する
  async validateUser(
    data: LogInUserRequest,
  ): Promise<ValidateUserResponse | null> {
    if (!data.userId || !data.password) {
      throw new NotFoundException('userIdまたはパスワードが存在しません。');
    }
    const user: User = await this.usersService.validateFindByUserId(
      data.userId,
    ); // DBからUserを取得

    if (user && compare(data.password, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  // jwt tokenを返す
  async login(data: LogInUserRequest): Promise<LogInUserResponse> {
    const user = await this.validateUser(data);

    // ログイン情報をactiveにする
    await this.prisma.user.update({
      where: { userId: user.userId },
      data: {
        active: true,
      },
    });

    // payload情報
    const payload: PayloadDto = {
      id: user.id,
      userId: user.userId,
      name: user.name,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    await this.prisma.token.upsert({
      where: { userId: user.userId },
      update: {
        token: accessToken,
      },
      create: {
        userId: user.userId,
        token: accessToken,
      },
    });

    return {
      status: 201,
      message: 'ログインしました。\nメール認証を行ってください。',
      accessToken: accessToken,
    };
  }

  async logout(req: FastifyRequest): Promise<LogOutUserResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.usersService.findOne(decoded.id);

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    // ログイン情報を非アクティブにする
    await this.prisma.user.update({
      where: { id: decoded.id },
      data: {
        active: false,
      },
    });

    await this.prisma.token.delete({
      where: { userId: user.userId },
    });

    return { status: 201, message: 'ログアウトしました。' };
  }

  async signup(user: User): Promise<VerifyEmailResponse> {
    // userIdが存在するかチェック
    if (!user.userId) {
      throw new NotFoundException('userIdが存在しません。');
    }
    // userIdを元にユーザが存在するかチェック
    const userFound = await this.prisma.user.findUnique({
      where: { userId: user.userId },
    });

    if (userFound) {
      throw new NotAcceptableException('ユーザが登録されています。');
    }

    // emailチェックを行うためのEmainToken作成
    const emailToken = generateEmailToken();
    // パスワードのハッシュ化
    const hash = getHash(user.password);

    // userを作成
    const createdUser = await this.prisma.user.create({
      data: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        password: hash,
        hashActivation: emailToken,
        active: true,
      },
    });

    // emailチェックのためメール送信する
    sendEmailToken(createdUser.email, createdUser.hashActivation);
    return {
      status: 201,
      message: 'メールアドレスを認証してください。',
      userId: user.userId,
    };
  }

  // メール認証
  async confirm(emailToken: string): Promise<ConfirmedUserResponse> {
    // emailTokenが存在しない
    if (!emailToken) {
      throw new NotFoundException('emailTokenが存在しません。');
    }
    // 認証用トークンの検索
    const user = await this.prisma.user.findFirst({
      where: {
        hashActivation: emailToken,
      },
    });

    if (user.emailVerified) {
      throw new NotAcceptableException('メール認証が完了しています');
    }

    // 認証されたので認証日時を保管
    const confirmedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        confirmedAt: new Date(),
        emailVerified: true,
      },
    });

    // return plainToClass(ConfirmedUserDto, confirmedUser);
    return confirmedUser;
  }

  async me(req: FastifyRequest) {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.usersService.findOne(decoded.id);

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    const userData = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified
        ? 'メールアドレス確認済みです'
        : '未認証',
      createdAt: user.createdAt,
    };

    return {
      status: 201,
      userData,
    };
  }
}
