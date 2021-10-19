import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import jwt_decode from 'jwt-decode';
// Service
import { PrismaService } from 'src/common/prisma.service';
// Dto
import { FindUserResponse } from './dto/find-user.dto';
import { DecodedDto } from 'src/auth/dto/decoded.dto';
import { FindAllUserResponse } from './dto/findAll-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

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
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.usersService.findOne(decoded.id);

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data,
    });
  }

  async removeAccountData(req: FastifyRequest): Promise<User> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.usersService.findOne(decoded.id);

    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }

    return this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
