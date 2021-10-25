import { Injectable, NotFoundException } from '@nestjs/common';
import { BasicPallet } from 'src/basic-pallet/entities/basic-pallet.entity';
import { PrismaService } from '../common/prisma.service';
import {
  CreateBasicPalletRequest,
  CreateBasicPalletResponse,
} from './dto/create-basic-pallet.dto';
import { FindBasicPalletResponse } from './dto/find-basic-pallet.dto';
import { FindAllBasicPalletResponse } from './dto/findAll-basic-pallet.dto';
import {
  UpdateBasicPalletRequest,
  UpdateBasicPalletResponse,
} from './dto/update-basic-pallet.dto';
import { RemoveBasicPalletResponse } from './dto/delete-basic-pallet.dto';

@Injectable()
export class BasicPalletService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse> {
    await this.prisma.basicPallet.create({ data: data });

    const ret: CreateBasicPalletResponse = {
      status: 201,
      message: 'ベーシックパレットを生成しました。',
    };

    return ret;
  }

  async findAll(): Promise<FindAllBasicPalletResponse[]> {
    return this.prisma.basicPallet.findMany();
  }

  /*
  async findOne(id: number) {
    return this.prisma.basicPallet.findUnique({
      where: { id: id },
    });
  }
*/

  async findByBasicPalletId(
    palletId: string,
  ): Promise<FindBasicPalletResponse> {
    if (!palletId) {
      throw new NotFoundException('palletIdが存在しません。');
    }
    const basicpallet = await this.prisma.basicPallet.findUnique({
      where: { palletId: palletId },
    });
    const ret: FindBasicPalletResponse = {
      palletId: palletId,
      name: basicpallet.name,
      description: basicpallet.description,
      data: basicpallet.data,
      createdAt: basicpallet.createdAt,
    };
    return ret;
  }

  async findByName(name: string): Promise<FindBasicPalletResponse> {
    if (!name) {
      throw new NotFoundException('palletnameが存在しません。');
    }
    const basicpallet = await this.prisma.basicPallet.findUnique({
      where: { name: name },
    });
    const ret: FindBasicPalletResponse = {
      palletId: basicpallet.palletId,
      name: name,
      description: basicpallet.description,
      data: basicpallet.data,
      createdAt: basicpallet.createdAt,
    };
    return ret;
  }

  async updateBasicPalletData(
    palletId: string,
    data: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse> {
    const basicpallet: BasicPallet = await this.prisma.basicPallet.findUnique({
      where: { palletId: palletId },
    });
    if (!basicpallet) {
      throw new NotFoundException('ベーシックパレットが存在しません。');
    }
    await this.prisma.basicPallet.update({
      where: { palletId: palletId },
      data: {
        name: data.name,
        description: data.description,
        data: data.data,
      },
    });
    const ret: UpdateBasicPalletResponse = {
      status: 201,
      message: '更新しました。',
    };
    return ret;
  }

  async removeBasicPalletData(
    palletId: string,
  ): Promise<RemoveBasicPalletResponse> {
    const basicpallet: BasicPallet = await this.prisma.basicPallet.findUnique({
      where: { palletId: palletId },
    });
    if (!basicpallet) {
      throw new NotFoundException('ベーシックパレットが存在しません。');
    }
    await this.prisma.basicPallet.delete({
      where: { palletId: palletId },
    });
    const ret: RemoveBasicPalletResponse = {
      status: 201,
      message: 'ベーシックパレットを削除しました。',
      palletId: palletId,
    };
    return ret;
  }
}
