import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
// サービス
import { PrismaService } from '../common/prisma.service';
// ヘルパー
import { compare, getHash } from '../common/helpers/cipherHelper';
import { generatePasswordToken } from '../common/helpers/activationCodeHelper';
import {
  sendEmailToken,
  sendPasswordResetEmailToken,
} from '../common/sendgrid.service';
// Dto系
import { DecodedDto } from '../auth/dto/decoded.dto';
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
import { User } from '../users/entities/user.entity';
import {
  PasswordResetReqResponse,
  PasswordResetRequest,
  PasswordResetResponse,
} from './dto/passwordReset-user.dto';
import { CreateUserRequest } from './dto/create-user.dto';
import { jwtDecoded } from '../common/helpers/jwtDecoded';
import { MeResponse } from './dto/me-auth.dto';
import { TokenServiceInterface } from '../token/interface/token.service.interface';
import { UsersServiceInterface } from '../users/interface/users.service.interface';
import { AuthServiceInterface } from './interface/auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersServiceInterface')
    private readonly _usersService: UsersServiceInterface,
    @Inject('TokenServiceInterface')
    private readonly _tokenService: TokenServiceInterface,
    private readonly _jwtService: JwtService,
    private readonly _prismaService: PrismaService,
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
    const user: User = await this._usersService.validateFindByUserId(
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
    await this._prismaService.user.update({
      where: { userId: user.userId },
      data: {
        isLoggedIn: true,
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
    const token = this._jwtService.sign(payload);
    const accessToken = await this._tokenService.setAccessToken(
      token,
      payload.userId,
    );

    return {
      status: 201,
      message: 'ログインしました。\nメール認証を行ってください。',
      accessToken: accessToken.token,
    };
  }

  /**
   * @description ログアウトする
   */
  async logout(req: FastifyRequest): Promise<LogOutUserResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const userId: string = await this._usersService.getUserIdById(decoded.id);

    // ログイン情報を非アクティブにする
    await this._prismaService.user.update({
      where: { id: decoded.id },
      data: {
        isLoggedIn: false,
      },
    });
    console.log(req);
    await this._tokenService.removeTokenByUserId(userId);

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
    const userFound = await this._prismaService.user.findUnique({
      where: { userId: user.userId },
    });

    if (userFound) {
      throw new NotAcceptableException('ユーザが登録されています。');
    }

    // パスワードのハッシュ化
    const hash = getHash(user.password);

    // userを作成
    const createdUser = await this._prismaService.user.create({
      data: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        password: hash,
        isLoggedIn: true,
      },
    });

    const token = await this._tokenService.createEmailToken(user.userId);

    // emailチェックのためメール送信する
    sendEmailToken(createdUser.email, token.emailToken);
    return {
      status: 201,
      message: 'メールアドレスを認証してください。',
      userId: user.userId,
    };
  }

  /**
   * @description メール認証する
   */
  async emailConfirm(emailToken: string): Promise<ConfirmedUserResponse> {
    // emailTokenが存在しない
    if (!emailToken) {
      throw new NotFoundException('emailTokenが存在しません。');
    }

    const user = await this._usersService.findUserByEmailToken(emailToken);

    if (user.emailVerified) {
      throw new NotAcceptableException('メール認証が完了しています');
    }

    // 認証されたので認証日時を保管
    const confirmedUser = await this._prismaService.user.update({
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
  async passwordResetRequest(
    req: FastifyRequest,
  ): Promise<PasswordResetReqResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user = await this._usersService.getUserProfileById(decoded.id);

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    const passwordToken = generatePasswordToken(user.userId);

    const token = await this._tokenService.setPasswordToken(
      user.userId,
      passwordToken,
    );

    sendPasswordResetEmailToken(user.email, token.passwordToken);
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

    const findToken = await this._usersService.findUserByEmailToken(token);

    if (!findToken) {
      throw new NotAcceptableException(
        'リセット期限が切れています。\n お手数ですがもう一度リセットのリクエストを送信してください。',
      );
    }

    const userId = findToken.userId;

    const password = getHash(data.password);

    await this._prismaService.user.update({
      where: {
        userId: userId,
      },
      data: {
        password: password,
      },
    });

    await this._tokenService.setPasswordToken(userId, null);

    return {
      status: 201,
      message: 'パスワードの再設定が完了しました。',
    };
  }

  /**
   * ログイン後自分のProfileを表示する
   */
  async me(req: FastifyRequest): Promise<MeResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user = await this._usersService.getUserProfileById(decoded.id);

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    const userData = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      confirmedAt: user.confirmedAt,
    };

    return {
      status: 201,
      ...userData,
    };
  }
}
