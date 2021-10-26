import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPallet } from 'src/user-pallet/entities/user-pallet.entity';
import { PrismaService } from '../common/prisma.service';
import { FindAllUserPalletResponse } from './dto/findAll-user-pallet.dto';
import { FindUserPalletResponse } from './dto/find-user-pallet.dto';
import { FastifyRequest } from 'fastify';
import { DecodedDto } from 'src/auth/dto/decoded.dto';
import { RemoveUserPalletResponse } from './dto/delete-user-pallet.dto';
import {
  UpdateUserPalletRequest,
  UpdateUserPalletResponse,
} from './dto/update-user-pallet.dto';
import {
  CreateUserPalletRequest,
  CreateUserPalletResponse,
} from './dto/create-user-pallet.dto';
import { jwtDecoded } from 'src/common/helpers/jwtDecoded';

@Injectable()
export class UserpalletService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse> {
    this.prisma.userPallet.create({ data });
    return {
      status: 201,
      message: 'ユーザーパレットを生成しました。',
    };
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
    data: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const userpallet: UserPallet = await this.prisma.userPallet.findUnique({
      where: { id: decoded.id },
    });
    if (!userpallet) {
      throw new NotFoundException('ユーザパレットが存在しません。');
    }
    this.prisma.userPallet.update({
      where: { id: userpallet.id },
      data,
    });
    return {
      status: 201,
      message: '更新しました。',
    };
  }

  async removeUserPalletData(
    req: FastifyRequest,
  ): Promise<RemoveUserPalletResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const userpallet: UserPallet = await this.prisma.userPallet.findUnique({
      where: { id: decoded.id },
    });
    if (!userpallet) {
      throw new NotFoundException('ユーザパレットが存在しません。');
    }
    const palletId = userpallet.palletId;
    this.prisma.userPallet.delete({
      where: { id: userpallet.id },
    });

    return {
      status: 201,
      message: 'ユーザーパレットを削除しました。',
      palletId: palletId,
    };
  }
}
