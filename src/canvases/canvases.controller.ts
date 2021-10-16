import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CanvasesService } from './canvases.service';
import { Canvases, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

// TODO: ApiResponseを記載する
@ApiTags('canvases')
@Controller('canvases')
export class CanvasesController {
  constructor(private readonly CanvasesService: CanvasesService) {}

  @Post()
  create(@Body() data: Prisma.CanvasesCreateInput): Promise<Canvases> {
    return this.CanvasesService.create(data);
  }

  @Get()
  async findAll(): Promise<Canvases[]> {
    return this.CanvasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Canvases> {
    return this.CanvasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.CanvasesUpdateInput) {
    return this.CanvasesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Canvases> {
    return this.CanvasesService.remove(+id);
  }
}
