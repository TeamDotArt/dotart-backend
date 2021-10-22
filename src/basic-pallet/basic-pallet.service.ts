import { Injectable, NotFoundException } from '@nestjs/common';
import { BasicPallet } from 'src/basic-pallet/entities/basic-pallet.entity';
import { PrismaService } from '../common/prisma.service';
import {
  CreateBasicPalletRequest,
  CreateBasicPalletResponse,
} from './dto/create-basic-pallet.dto';
import { FindBasicPalletResponse } from './dto/find-basic-pallet.dto';
import { FindAllBasicPalletResponse } from './dto/findAll-basic-pallet.dto';
import { FastifyRequest } from 'fastify';
import jwt_decode from 'jwt-decode';
import {
  UpdateBasicPalletRequest,
  UpdateBasicPalletResponse,
} from './dto/update-basic-pallet.dto';
import { DecodedDto } from 'src/auth/dto/decoded.dto';
import { RemoveBasicPalletResponse } from './dto/delete-basic-pallet.dto';

@Injectable()
export class BasicPalletService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse> {
    this.prisma.basicPallet.create({ data });
    return {
      status: 201,
      message: 'ベーシックパレットを生成しました。',
    };
  }

  async findAll(): Promise<FindAllBasicPalletResponse[]> {
    return this.prisma.basicPallet.findMany();
  }

  async findOne(id: number) {
    return this.prisma.basicPallet.findUnique({
      where: { id: id },
    });
  }

  async findByBasicPalletId(
    palletId: number,
  ): Promise<FindBasicPalletResponse> {
    if (!palletId) {
      throw new NotFoundException('palletIdが存在しません。');
    }
    const basicpallet = await this.prisma.basicPallet.findUnique({
      where: { palletId: palletId },
    });
    const ret: FindBasicPalletResponse = {
      palletId: basicpallet.palletId,
      name: basicpallet.name,
      description: basicpallet.description,
      data: basicpallet.data,
      createdAt: basicpallet.createdAt,
    };
    return ret;
  }

  async updateBasicPalletData(
    req: FastifyRequest,
    data: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const basicpallet: BasicPallet = await this.prisma.basicPallet.findUnique({
      where: { id: decoded.id },
    });
    if (!basicpallet) {
      throw new NotFoundException('ベーシックパレットが存在しません。');
    }
    this.prisma.basicPallet.update({
      where: { id: basicpallet.id },
      data,
    });
    return {
      status: 201,
      message: '更新しました。',
    };
  }

  async removeBasicPalletData(
    req: FastifyRequest,
  ): Promise<RemoveBasicPalletResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const basicpallet: BasicPallet = await this.prisma.basicPallet.findUnique({
      where: { id: decoded.id },
    });
    if (!basicpallet) {
      throw new NotFoundException('ベーシックパレットが存在しません。');
    }
    const palletId = basicpallet.palletId;
    this.prisma.basicPallet.delete({
      where: { id: basicpallet.id },
    });
    return {
      status: 201,
      message: 'ベーシックパレットを削除しました。',
      palletId: palletId,
    };
  }
}
