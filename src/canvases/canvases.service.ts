import { Injectable, NotFoundException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import jwt_decode from 'jwt-decode';
// Service
import { PrismaService } from '../common/prisma.service';
import { UsersService } from 'src/users/users.service';
// entity
import { User } from 'src/users/entities/user.entity';
import { Canvas } from 'src/canvases/entities/canvase.entity';
// Dto
import { RemoveCanvasResponse } from './dto/delete-canvas.dto';
import {
  CreateCanvasRequest,
  CreateCanvasResponse,
} from './dto/create-canvas.dto';
import { FindAllCanvasResponse } from './dto/findAll-canvas.dto';
import { FindCanvasResponse } from './dto/find-canvas.dto';
import {
  UpdateCanvasRequest,
  UpdateCanvasResponse,
} from './dto/update-canvas.dto';
import { DecodedDto } from 'src/auth/dto/decoded.dto';

@Injectable()
export class CanvasesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(
    req: FastifyRequest,
    data: CreateCanvasRequest,
  ): Promise<CreateCanvasResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.usersService.findOne(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    await this.prisma.canvases.create({
      data: {
        canvasId: data.canvasId,
        userId: data.userId,
        canvasName: data.canvasName,
        canvasRange: data.canvasRange,
        pallet: data.pallet,
        indexData: data.indexData,
      },
    });
    const ret: CreateCanvasResponse = {
      status: 201,
      message: 'キャンバスを生成しました。',
      canvasId: data.canvasId,
    };
    return ret;
  }

  async findAll(): Promise<FindAllCanvasResponse[]> {
    return this.prisma.canvases.findMany();
  }

  async findByCanvasId(canvasId: string): Promise<FindCanvasResponse> {
    if (!canvasId) {
      throw new NotFoundException('canvasIdが存在しません。');
    }
    const canvas = await this.prisma.canvases.findUnique({
      where: { canvasId: canvasId },
    });
    const ret: FindCanvasResponse = {
      canvasId: canvas.canvasId,
      canvasName: canvas.canvasName,
      canvasRange: canvas.canvasRange,
      pallet: canvas.pallet,
      indexData: canvas.indexData,
      createdAt: canvas.createdAt,
      updatedAt: canvas.updatedAt,
    };
    return ret;
  }

  async findByCanvasName(canvasNaeme: string): Promise<FindCanvasResponse> {
    if (!canvasNaeme) {
      throw new NotFoundException('canvasNameが存在しません。');
    }
    const canvas = await this.prisma.canvases.findFirst({
      where: { canvasName: canvasNaeme },
    });
    const ret: FindCanvasResponse = {
      canvasId: canvas.canvasId,
      canvasName: canvas.canvasName,
      canvasRange: canvas.canvasRange,
      pallet: canvas.pallet,
      indexData: canvas.indexData,
      createdAt: canvas.createdAt,
      updatedAt: canvas.updatedAt,
    };
    return ret;
  }

  async updateCanvas(
    req: FastifyRequest,
    data: UpdateCanvasRequest,
  ): Promise<UpdateCanvasResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.usersService.findOne(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    const canvas: Canvas = await this.prisma.canvases.findFirst({
      where: { userId: user.userId },
    });
    if (!canvas) {
      throw new NotFoundException('キャンバスが存在しません。');
    }
    await this.prisma.canvases.update({
      where: {
        canvasId: canvas.canvasId,
      },
      data: data,
    });
    const ret: UpdateCanvasResponse = {
      status: 201,
      message: 'キャンバスを更新しました。',
      canvasId: canvas.canvasId,
    };
    return ret;
  }

  async removeCanvasData(req: FastifyRequest): Promise<RemoveCanvasResponse> {
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.usersService.findOne(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    const canvas: Canvas = await this.prisma.canvases.findFirst({
      where: { userId: user.userId },
    });
    if (!canvas) {
      throw new NotFoundException('キャンバスが存在しません。');
    }
    await this.prisma.canvases.delete({
      where: { canvasId: canvas.canvasId },
    });
    const ret: RemoveCanvasResponse = {
      status: 201,
      message: 'キャンバスを削除しました。',
      canvasId: canvas.canvasId,
    };
    return ret;
  }
}
