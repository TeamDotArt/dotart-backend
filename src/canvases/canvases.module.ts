import { Module } from '@nestjs/common';
import { CanvasesService } from './canvases.service';
import { CanvasesController } from './canvases.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [CanvasesController],
  providers: [CanvasesService, PrismaService, UsersService],
})
export class CanvasesModule {}
