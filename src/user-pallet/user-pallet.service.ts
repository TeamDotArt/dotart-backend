import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPallet } from 'src/user-pallet/entities/user-pallet.entity';
// Service
import { PrismaService } from '../common/prisma.service';
// Dto
import { FindAllUserPalletResponse } from './dto/findAll-user-pallet.dto';
import { FindUserPalletResponse } from './dto/find-user-pallet.dto';
import { RemoveUserPalletResponse } from './dto/delete-user-pallet.dto';
import {
  UpdateUserPalletRequest,
  UpdateUserPalletResponse,
} from './dto/update-user-pallet.dto';
import {
  CreateUserPalletRequest,
  CreateUserPalletResponse,
} from './dto/create-user-pallet.dto';

@Injectable()
export class UserpalletService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse> {
    await this.prisma.userPallet.create({ data });
    const ret: CreateUserPalletResponse = {
      status: 201,
      message: 'ユーザーパレットを生成しました。',
      palletId: data.palletId,
    };
    return ret;
  }

  async findAll(): Promise<FindAllUserPalletResponse[]> {
    return this.prisma.userPallet.findMany();
  }
  /*
  async findOne(id: number) {
    return this.prisma.userPallet.findUnique({
      where: { id: id },
    });
  }
*/

  async findByUserPalletId(palletId: string): Promise<FindUserPalletResponse> {
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

  async findByUserPallletName(name: string): Promise<FindUserPalletResponse> {
    if (!name) {
      throw new NotFoundException('palletnameが存在しません。');
    }
    const pallet = await this.prisma.userPallet.findUnique({
      where: { name: name },
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
    palletId: string,
    data: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse> {
    const userpallet: UserPallet = await this.prisma.userPallet.findUnique({
      where: { palletId: palletId },
    });
    if (!userpallet) {
      throw new NotFoundException('ユーザパレットが存在しません。');
    }
    await this.prisma.userPallet.update({
      where: { palletId: palletId },
      data,
    });
    const ret: UpdateUserPalletResponse = {
      status: 201,
      message: '更新しました。',
      palletId: data.palletId,
    };
    return ret;
  }

  async removeUserPalletData(
    palletId: string,
  ): Promise<RemoveUserPalletResponse> {
    const userpallet: UserPallet = await this.prisma.userPallet.findUnique({
      where: { palletId: palletId },
    });
    if (!userpallet) {
      throw new NotFoundException('ユーザパレットが存在しません。');
    }
    await this.prisma.userPallet.delete({
      where: { palletId: palletId },
    });
    const ret: RemoveUserPalletResponse = {
      status: 201,
      message: 'ユーザーパレットを削除しました。',
      palletId: palletId,
    };
    return ret;
  }
}
