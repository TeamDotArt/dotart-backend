import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import jwt_decode from 'jwt-decode';

// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { compare, getHash } from '../common/helpers/cipherHelper';
import { PrismaService } from 'src/common/prisma.service';
import { DecodedDto } from 'src/users/dto/decoded.dto';
import { generateEmailToken } from 'src/common/helpers/activationCodeHelper';
import { sendEmailToken } from 'src/common/sendgrid.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
// import { plainToClass } from 'class-transformer';

// password情報を省いたUser情報
type PasswordOmitUser = Omit<User, 'password'>;

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
    private prisma: PrismaService,
  ) {}

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }

  // ユーザーを認証する
  async validateUser(
    userId: User['userId'],
    password: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user: User = await this.usersService.findByUserId(userId); // DBからUserを取得

    if (user && compare(password, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  // jwt tokenを返す
  async login(user: PasswordOmitUser) {
    // TODO: メアド認証を実装する

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

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(req) {
    const decoded: DecodedDto = jwt_decode(req.header('Authorization'));

    // ログイン情報を非アクティブにする
    await this.prisma.user.update({
      where: { id: decoded.sub },
      data: {
        active: false,
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
