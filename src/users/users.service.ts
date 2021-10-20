import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import jwt_decode from 'jwt-decode';
// Service
import { PrismaService } from 'src/common/prisma.service';
// Dto
import { FindUserResponse } from './dto/find-user.dto';
import { DecodedDto } from 'src/auth/dto/decoded.dto';
import { FindAllUserResponse } from './dto/findAll-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { getHash } from 'src/common/helpers/cipherHelper';
import { RemoveUserResponse } from './dto/remove-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<FindAllUserResponse[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException('idが存在しません。');
    }
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async validateFindByUserId(userId: string): Promise<User> {
    if (!userId) {
      throw new NotFoundException('ユーザIdが存在しません。');
    }
    return this.prisma.user.findUnique({
      where: { userId: userId },
    });
  }

  async findByUserId(userId: string): Promise<FindUserResponse> {
    if (!userId) {
      throw new NotFoundException('ユーザIdが存在しません。');
    }
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    const ret: FindUserResponse = {
      userId: user.userId,
      name: user.name,
      createdAt: user.createdAt,
    };

    return ret;
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
