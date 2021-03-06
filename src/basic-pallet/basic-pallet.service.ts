import { Injectable, NotFoundException } from '@nestjs/common';
import { BasicPallet } from '../basic-pallet/entities/basic-pallet.entity';
// Service
import { PrismaService } from '../common/prisma.service';
// Dto
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
import { BasicPalletServiceInterface } from './interface/basicPallet.service.interface';

@Injectable()
export class BasicPalletService implements BasicPalletServiceInterface {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(
    data: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse> {
    await this._prismaService.basicPallet.create({ data: data });

    const ret: CreateBasicPalletResponse = {
      status: 201,
      message: 'ベーシックパレットを生成しました。',
      palletId: data.palletId,
    };

    return ret;
  }

  async findAll(): Promise<FindAllBasicPalletResponse[]> {
    return this._prismaService.basicPallet.findMany();
  }

  /*
  async findOne(id: number) {
    return this.prisma.basicPallet.findUnique({
      where: { id: id },
    });
  }
*/

  async findBasicPalletId(palletId: string): Promise<FindBasicPalletResponse> {
    if (!palletId) {
      throw new NotFoundException('palletIdが存在しません。');
    }
    const basicpallet = await this._prismaService.basicPallet.findUnique({
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

  async findBasicPalletByName(name: string): Promise<FindBasicPalletResponse> {
    if (!name) {
      throw new NotFoundException('palletnameが存在しません。');
    }
    const basicpallet = await this._prismaService.basicPallet.findUnique({
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

  async update(
    palletId: string,
    data: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse> {
    const basicpallet: BasicPallet =
      await this._prismaService.basicPallet.findUnique({
        where: { palletId: palletId },
      });
    if (!basicpallet) {
      throw new NotFoundException('ベーシックパレットが存在しません。');
    }
    await this._prismaService.basicPallet.update({
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

  async remove(palletId: string): Promise<RemoveBasicPalletResponse> {
    const basicpallet: BasicPallet =
      await this._prismaService.basicPallet.findUnique({
        where: { palletId: palletId },
      });
    if (!basicpallet) {
      throw new NotFoundException('ベーシックパレットが存在しません。');
    }
    await this._prismaService.basicPallet.delete({
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
