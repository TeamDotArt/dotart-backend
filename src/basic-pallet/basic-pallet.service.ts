import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { BasicPallet } from './entities/basic-pallet.entity';
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
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class BasicPalletService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse> {
    const basicpallet: BasicPallet = await this.prisma.basicPallet.findUnique({
      where: { palletId: data.palletId },
    });
    if (basicpallet) {
      throw new PrismaClientKnownRequestError(
        'ベーシックパレットがすでに存在します',
        'P1009',
        '3.3.0',
        '{target:["palletId"]}',
      );
    } else if (data.palletId == '') {
      throw new NotAcceptableException('palletIdが未入力です。');
    } else if (data.name == '') {
      throw new NotAcceptableException('nameが未入力です。');
    }
    await this.prisma.basicPallet.create({ data: data });

    const ret: CreateBasicPalletResponse = {
      status: 201,
      message: 'ベーシックパレットを生成しました。',
      palletId: data.palletId,
    };

    return ret;
  }

  async findAll(): Promise<FindAllBasicPalletResponse[]> {
    return this.prisma.basicPallet.findMany();
  }

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
    } else if ((palletId = '')) {
      throw new NotAcceptableException('palletIdが指定されていません。');
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
      palletId: palletId,
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
    } else if ((palletId = '')) {
      throw new NotAcceptableException('palletIdが指定されていません。');
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
