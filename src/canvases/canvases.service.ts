import { Injectable, NotFoundException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { jwtDecoded } from 'src/common/helpers/jwtDecoded';
// Service
import { PrismaService } from '../common/prisma.service';
import { UsersService } from 'src/users/users.service';
// Dto
import {
  RemoveCanvasResponse,
  RemoveCanvasRequest,
} from './dto/delete-canvas.dto';
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
import { CanvasesServiceInterface } from './interface/canvases.service.interface';

@Injectable()
export class CanvasesService implements CanvasesServiceInterface {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(
    req: FastifyRequest,
    data: CreateCanvasRequest,
  ): Promise<CreateCanvasResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user = await this.usersService.getUserIdById(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    await this.prisma.canvases.create({
      data: {
        canvasId: data.canvasId,
        userId: user,
        canvasName: data.canvasName,
        canvasRange: data.canvasRange,
        pallet: data.pallet,
        canvasesData: data.canvasesData,
      },
    });
    const ret: CreateCanvasResponse = {
      status: 201,
      message: 'キャンバスを生成しました。',
      canvasId: data.canvasId,
    };
    return ret;
  }

  async findAll(req: FastifyRequest): Promise<FindAllCanvasResponse[]> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user = await this.usersService.getUserIdById(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    const canvas = await this.prisma.canvases.findMany({
      where: { userId: user },
    });
    if (!canvas) {
      throw new NotFoundException('キャンバスが存在しません。');
    }
    return canvas;
  }

  async findCanvasId(canvasId: string): Promise<FindCanvasResponse> {
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
      canvasesData: canvas.canvasesData,
      createdAt: canvas.createdAt,
      updatedAt: canvas.updatedAt,
    };
    return ret;
  }

  async findCanvasByName(canvasNaeme: string): Promise<FindCanvasResponse> {
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
      canvasesData: canvas.canvasesData,
      createdAt: canvas.createdAt,
      updatedAt: canvas.updatedAt,
    };
    return ret;
  }

  async update(
    req: FastifyRequest,
    data: UpdateCanvasRequest,
  ): Promise<UpdateCanvasResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user = await this.usersService.getUserIdById(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    const canvases = await this.prisma.canvases.findMany({
      where: {
        userId: user,
      },
    });
    if (!canvases) {
      throw new NotFoundException('作成しているキャンバスが存在しません。');
    }
    const canvas = await this.prisma.canvases.findUnique({
      where: {
        canvasId: data.canvasId,
      },
    });
    if (!canvas) {
      throw new NotFoundException('指定したキャンバスが存在しません。');
    }
    const canvasId = canvases.filter(
      (canvases) => canvases.canvasId === canvas.canvasId,
    );
    if (!canvasId.length) {
      throw new NotFoundException(
        '指定したキャンバスと保存されているキャンバスが一致しません。',
      );
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

  async remove(
    req: FastifyRequest,
    data: RemoveCanvasRequest,
  ): Promise<RemoveCanvasResponse> {
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user = await this.usersService.getUserIdById(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    const canvases = await this.prisma.canvases.findMany({
      where: { userId: user },
    });
    if (!canvases) {
      throw new NotFoundException('作成しているキャンバスが存在しません。');
    }
    const canvas = await this.prisma.canvases.findUnique({
      where: {
        canvasId: data.canvasId,
      },
    });
    if (!canvas) {
      throw new NotFoundException('指定したキャンバスが存在しません。');
    }
    const canvasId = canvases.filter(
      (canvases) => canvases.canvasId === canvas.canvasId,
    );
    if (!canvasId.length) {
      throw new NotFoundException(
        '指定したキャンバスと保存されているキャンバスが一致しません。',
      );
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
