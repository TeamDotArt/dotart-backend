import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Token, User } from '@prisma/client';
import jwt_decode from 'jwt-decode';

// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { compare, getHash } from '../common/helpers/cipherHelper';
import { PrismaService } from 'src/common/prisma.service';
import { DecodedDto } from 'src/users/dto/decoded.dto';
import { generateEmailToken } from 'src/common/helpers/activationCodeHelper';
import { sendEmailToken } from 'src/common/sendgrid.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
// import { plainToClass } from 'class-transformer';

// password情報を省いたUser情報
type PasswordOmitUser = Omit<User, 'password'>;
type TokenOmitUser = Omit<Token, 'id'>;

interface JWTPayload {
  id: User['id'];
  userId: User['userId'];
  name: User['name'];
  role: User['role'];
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private prisma: PrismaService,
  ) {}

  // ユーザーを認証する
  async validateUser(data: User): Promise<PasswordOmitUser | null> {
    const user: User = await this.usersService.findByUserId(data.userId); // DBからUserを取得

    if (user && compare(data.password, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  // jwt tokenを返す
  async login(data: User) {
    const user = await this.validateUser(data);
    if (!user) {
      throw new NotFoundException('User not found');
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
    const payload: JWTPayload = {
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
      access_token: accessToken,
    };
  }

  async logout(req) {
    const decoded: DecodedDto = jwt_decode(req.header('Authorization'));
    const user: User = await this.usersService.findOne(decoded.sub);

    // ログイン情報を非アクティブにする
    await this.prisma.user.update({
      where: { id: decoded.sub },
      data: {
        active: false,
      },
    });

    // トークンを無効化する
    await this.prisma.token.update({
      where: { userId: user.userId },
      data: {
        token: '',
      },
    });
    return { message: 'ログアウトしました。' };
  }

  async signup(user: User): Promise<VerifyEmailDto> {
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
    return { status: 201, message: 'メールアドレスを認証してください。' };
  }

  // メール認証
  async confirm(emailToken: string): Promise<User> {
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
