import { Injectable, NotFoundException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import jwt_decode from 'jwt-decode';
// Service
import { PrismaService } from 'src/common/prisma.service';
// Dto
import { DecodedDto } from 'src/auth/dto/decoded.dto';
import { FindAllUserResponse } from './dto/findAll-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { getHash } from 'src/common/helpers/cipherHelper';
import { RemoveUserResponse } from './dto/remove-user.dto';
import { User } from './entities/user.entity';
import { GetUserProfileResponse } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * @description ユーザ全検索
   */
  async findAll(): Promise<FindAllUserResponse[]> {
    return this.prisma.user.findMany();
  }

  /**
   * @description ユーザを固有IDから検索
   */
  async findOne(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException('idが存在しません。');
    }
    return this.prisma.user.findUnique({
      where: { id: id },
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
   * @description ユーザ固有IDをからプロフィール情報を検索
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
  async getUserProfileByUserId(
    userId: string,
  ): Promise<GetUserProfileResponse> {
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

  async updateProfileData(
    req: FastifyRequest,
    data: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    const userId = await this.prisma.user.findUnique({
      where: { userId: data.userId },
    });
    if (userId) {
      throw new NotFoundException('このユーザIdは存在します。');
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

    this.prisma.user.update({
      where: { id: user.id },
      data,
    });

    return {
      status: 201,
      message: '更新しました。',
    };
  }

  async removeAccountData(req: FastifyRequest): Promise<RemoveUserResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    const userId = user.userId;

    this.prisma.user.delete({
      where: { id: user.id },
    });

    return {
      status: 201,
      message: 'アカウントを削除しました。',
      userId: userId,
    };
  }
}
