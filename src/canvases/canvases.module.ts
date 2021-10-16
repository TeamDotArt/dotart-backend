import { Module } from '@nestjs/common';
import { CanvasesService } from './canvases.service';
import { CanvasesController } from './canvases.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [CanvasesController],
  providers: [CanvasesService, PrismaService],
})
export class CanvasesModule {}
