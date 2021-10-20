import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPallet, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { FindAllUserPalletResponse } from './dto/findAll-user-pallet.dto';
import { FindUserPalletResponse } from './dto/find-user-pallet.dto';
import { FastifyRequest } from 'fastify';
import jwt_decode from 'jwt-decode';
import { DecodedDto } from 'src/auth/dto/decoded.dto';

@Injectable()
export class UserpalletService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserPalletCreateInput): Promise<UserPallet> {
    return this.prisma.userPallet.create({ data });
  }

  async findAll(): Promise<FindAllUserPalletResponse[]> {
    return this.prisma.userPallet.findMany();
  }

  async findOne(id: number) {
    return this.prisma.userPallet.findUnique({
      where: { id: id },
    });
  }

  async findByUserPalletId(palletId: number): Promise<FindUserPalletResponse> {
    if (!palletId) {
      throw new NotFoundException('palletIdが存在しません。');
    }
    const pallet = await this.prisma.userPallet.findUnique({
      where: { palletId: palletId },
    });
    const ret: FindUserPalletResponse = {
      palletId: pallet.palletId,
      name: pallet.name,
      data: pallet.data,
      createdAt: pallet.createdAt,
    };

    return ret;
  }

  async updateUserPalletData(
    req: FastifyRequest,
    data: Prisma.UserPalletUpdateInput,
  ): Promise<UserPallet> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const userpallet: UserPallet = await this.prisma.userPallet.findUnique({
      where: { id: decoded.id },
    });
    if (!userpallet) {
      throw new NotFoundException('ユーザパレットが存在しません。');
    }
    return this.prisma.userPallet.update({
      where: { id: userpallet.id },
      data,
    });
  }

  async removeUserPalletData(req: FastifyRequest): Promise<UserPallet> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const userpallet: UserPallet = await this.prisma.userPallet.findUnique({
      where: { id: decoded.id },
    });
    if (!userpallet) {
      throw new NotFoundException('ユーザパレットが存在しません。');
    }
    return this.prisma.userPallet.delete({
      where: { id: userpallet.id },
    });
  }
}
