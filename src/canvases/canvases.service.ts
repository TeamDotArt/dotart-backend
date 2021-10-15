import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Canvases, Prisma } from '@prisma/client';

@Injectable()
export class CanvasesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CanvasesCreateInput): Promise<Canvases> {
    return this.prisma.canvases.create({ data });
  }

  async findAll(): Promise<Canvases[]> {
    return this.prisma.canvases.findMany();
  }

  async findOne(id: number) {
    return this.prisma.canvases.findUnique({
      where: { id: id },
    });
  }

  async update(
    id: number,
    data: Prisma.CanvasesUpdateInput,
  ): Promise<Canvases> {
    return this.prisma.canvases.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: number): Promise<Canvases> {
    return this.prisma.canvases.delete({
      where: { id: id },
    });
  }
}
