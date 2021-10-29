import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
// サービス
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { PrismaService } from 'src/common/prisma.service';
// ヘルパー
import { compare, getHash } from '../common/helpers/cipherHelper';
import { generatePasswordToken } from 'src/common/helpers/activationCodeHelper';
import {
  sendEmailToken,
  sendPasswordResetEmailToken,
} from 'src/common/sendgrid.service';
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
import {
  PasswordResetReqResponse,
  PasswordResetRequest,
  PasswordResetResponse,
} from './dto/passwordReset-user.dto';
import { CreateUserRequest } from './dto/create-user.dto';
import { jwtDecoded } from 'src/common/helpers/jwtDecoded';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private prisma: PrismaService,
  ) {}

  /**
   * @description ユーザーを認証する
   */
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

  /**
   * @description ログインしjwt tokenを返す
   */
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

    // トークン作成、登録
    const accessToken = await this.tokenService.createToken(payload);

    return {
      status: 201,
      message: 'ログインしました。\nメール認証を行ってください。',
      accessToken: accessToken,
    };
  }

  /**
   * @description ログアウトする
   */
  async logout(req: FastifyRequest): Promise<LogOutUserResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const userId: string = await this.usersService.getUserIdById(decoded.id);

    // ログイン情報を非アクティブにする
    await this.prisma.user.update({
      where: { id: decoded.id },
      data: {
        active: false,
      },
    });

    await this.tokenService.removeTokenByUserId(userId);

    return { status: 201, message: 'ログアウトしました。' };
  }

  /**
   * @description サインインする
   */
  async signup(user: CreateUserRequest): Promise<VerifyEmailResponse> {
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

    // パスワードのハッシュ化
    const hash = getHash(user.password);

    // userを作成
    const createdUser = await this.prisma.user.create({
      data: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        password: hash,
        active: true,
      },
    });

    const token = await this.tokenService.createEmailToken(user.userId);

    // emailチェックのためメール送信する
    sendEmailToken(createdUser.email, token);
    return {
      status: 201,
      message: 'メールアドレスを認証してください。',
      userId: user.userId,
    };
  }

  /**
   * @description メール認証する
   */
  async confirm(emailToken: string): Promise<ConfirmedUserResponse> {
    // emailTokenが存在しない
    if (!emailToken) {
      throw new NotFoundException('emailTokenが存在しません。');
    }

    const user = await this.usersService.findUserByEmailToken(emailToken);

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

  /**
   * パスワードリセットリクエストを送信する
   */
  async passwordResetReq(
    req: FastifyRequest,
  ): Promise<PasswordResetReqResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user = await this.usersService.getUserProfileById(decoded.id);

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    const passwordToken = generatePasswordToken(user.userId);

    const token = await this.tokenService.setPasswordToken(
      user.userId,
      passwordToken,
    );

    sendPasswordResetEmailToken(user.email, token);
    return {
      status: 201,
      message: 'パスワードの再設定を行ってください。',
    };
  }

  /**
   * パスワードリセットを行う
   */
  async passwordReset(
    token: string,
    data: PasswordResetRequest,
  ): Promise<PasswordResetResponse> {
    if (!token) {
      throw new NotFoundException('passwordResetTokenが存在しません。');
    }

    const findToken = await this.usersService.findUserByEmailToken(token);

    if (!findToken) {
      throw new NotAcceptableException(
        'リセット期限が切れています。\n お手数ですがもう一度リセットのリクエストを送信してください。',
      );
    }

    const userId = findToken.userId;

    const password = getHash(data.password);

    await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        password: password,
      },
    });

    await this.tokenService.setPasswordToken(userId, null);

    return {
      status: 201,
      message: 'パスワードの再設定が完了しました。',
    };
  }

  /**
   * ログイン後自分のProfileを表示する
   */
  async me(req: FastifyRequest) {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user = await this.usersService.getUserProfileById(decoded.id);

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
