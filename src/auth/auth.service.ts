import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@prisma/client';
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
import { DecodedDto } from 'src/users/dto/decoded.dto';
import { VerifyEmailResponse } from './dto/verify-email.dto';
import { PayloadDto } from './dto/payload.dto';
import { LogOutUserRequest, LogOutUserResponse } from './dto/logout-user.dto';
import { ConfirmedUserDto } from './dto/confirmed-user.dto';
import { LogInUserRequest, LogInUserResponse } from './dto/login-user.dto';
// Entity
import { User } from 'src/users/entities/user.entity';

// password情報を省いたUser情報
type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private prisma: PrismaService,
  ) {}

  // ユーザーを認証する
  async validateUser(data: LogInUserRequest): Promise<PasswordOmitUser | null> {
    const user: User = await this.usersService.findByUserId(data.userId); // DBからUserを取得

    if (user && compare(data.password, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  // jwt tokenを返す
  async login(data: LogInUserRequest): Promise<LogInUserResponse> {
    const user = await this.validateUser(data);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    // const validatedUser = this.validateUser(user);

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

  async logout(req: LogOutUserRequest): Promise<LogOutUserResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    console.log(decoded);
    const user: User = await this.usersService.findOne(decoded.id);

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
    // userIdを元にユーザが存在するかチェック
    let userFound = await this.prisma.user.findUnique({
      where: { userId: user.userId },
    });

    if (userFound) {
      throw new NotAcceptableException('ユーザが登録されていません。');
    }

    userFound = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (userFound) {
      throw new NotAcceptableException('User is already registered');
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
  async confirm(emailToken: string): Promise<ConfirmedUserDto> {
    // 認証用トークンの検索
    const user = await this.prisma.user.findFirst({
      where: {
        hashActivation: emailToken,
      },
    });

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
}
