import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

// Service
import { PrismaService } from '../common/prisma.service';
// Entity
import { User } from './entities/user.entity';
// Helper
import { jwtDecoded } from '../common/helpers/jwtDecoded';
import { getHash } from '../common/helpers/cipherHelper';
// Dto
import { DecodedDto } from '../auth/dto/decoded.dto';
import { FindAllUserResponse } from './dto/findAll-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { RemoveUserResponse } from './dto/remove-user.dto';
import { GetUserProfileResponse } from './dto/get-user.dto';
import { TokenServiceInterface } from '../token/interface/token.service.interface';
import { UsersServiceInterface } from './interface/users.service.interface';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @Inject('TokenServiceInterface')
    private readonly tokenService: TokenServiceInterface,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * @description ユーザ全検索
   */
  async findAll(): Promise<FindAllUserResponse[]> {
    return this.prisma.user.findMany();
  }

  /**
   * @description ユーザを固有IDから検索
   */
  async findUserById(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException('idが存在しません。');
    }
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  /**
   * @description emailTokenから検索
   */
  async findUserByEmailToken(emailToken: string): Promise<User> {
    if (!emailToken) {
      throw new NotFoundException('idが存在しません。');
    }

    // emailTokenからUserIdを検索
    const user = await this.tokenService.getUserIdByEmailToken(emailToken);

    return this.prisma.user.findUnique({
      where: { userId: user.userId },
    });
  }

  /**
   * @description passwordTokenからUserの検索
   */
  async findUserByPasswordToken(passwordToken: string): Promise<User> {
    if (!passwordToken) {
      throw new NotFoundException('idが存在しません。');
    }

    // emailTokenからUserIdを検索
    const user = await this.tokenService.getUserIdByPasswordToken(
      passwordToken,
    );

    return this.prisma.user.findUnique({
      where: { userId: user.userId },
    });
  }

  /**
   * @description ユーザ固有IDからユーザIDを検索
   */
  async getUserIdById(id: number): Promise<string> {
    if (!id) {
      throw new NotFoundException('idが存在しません。');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    return user.userId;
  }

  /**
   * @description ユーザ名からユーザIDを検索
   */
  async getUserIdByName(name: string): Promise<string> {
    if (!name) {
      throw new NotFoundException('idが存在しません。');
    }

    const user = await this.prisma.user.findFirst({
      where: { name: name },
    });

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    return user.userId;
  }

  /**
   * @description ユーザ固有IDからプロフィール情報を検索
   */
  async getUserProfileById(id: number): Promise<GetUserProfileResponse> {
    if (!id) {
      throw new NotFoundException('idが存在しません。');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };
  }

  /**
   * @description ユーザIDからプロフィール情報を検索
   */
  async getUserProfile(userId: string): Promise<GetUserProfileResponse> {
    if (!userId) {
      throw new NotFoundException('ユーザIdが存在しません。');
    }
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };
  }

  /**
   * @description ユーザIDからユーザデータを取得(認証用)
   */
  async validateFindByUserId(userId: string): Promise<User> {
    if (!userId) {
      throw new NotFoundException('ユーザIdが存在しません。');
    }
    return this.prisma.user.findUnique({
      where: { userId: userId },
    });
  }

  /**
   * @description ユーザのProfileを更新
   */
  async updateProfile(
    req: FastifyRequest,
    data: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user: User = await this.prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    if (data.email) {
      // メールを未認証に
      this.prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: false,
        },
      });
    }

    if (data.password) {
      // パスワードのハッシュ化
      data.password = getHash(data.password);
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data,
    });

    return {
      status: 201,
      message: '更新しました。',
    };
  }

  /**
   * @description ユーザの削除
   */
  async remove(req: FastifyRequest): Promise<RemoveUserResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user: User = await this.prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    const userId = user.userId;

    await this.tokenService.removeTokenByUserId(user.userId);

    // ユーザパレットを削除
    await this.prisma.userPallet.delete({
      where: { id: user.id },
    });

    // キャンバスを削除
    await this.prisma.canvases.delete({
      where: { id: user.id },
    });

    // 依存関係を削除したのでユーザを削除
    await this.prisma.user.delete({
      where: { id: user.id },
    });

    return {
      status: 201,
      message: 'アカウントを削除しました。',
      userId: userId,
    };
  }
}
