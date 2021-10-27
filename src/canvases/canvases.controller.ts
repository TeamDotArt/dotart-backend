import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
// Service
import { CanvasesService } from './canvases.service';
// Guards
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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

// TODO: ApiResponseを記載する
@ApiTags('canvases')
@Controller('canvases')
export class CanvasesController {
  constructor(private readonly canvasesService: CanvasesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  // Swagger定義
  @ApiOperation({
    summary: 'キャンバス生成',
  })
  @ApiResponse({ status: HttpStatus.OK, type: CreateCanvasResponse })
  @ApiBody({
    type: CreateCanvasRequest,
    description: 'キャンバスの詳細情報',
  })
  // フックメソッド
  create(
    @Req() req: FastifyRequest,
    @Body() data: CreateCanvasRequest,
  ): Promise<CreateCanvasResponse> {
    return this.canvasesService.create(req, data);
  }

  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全キャンバス検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindAllCanvasResponse })
  // フックメソッド
  async findAll(): Promise<FindAllCanvasResponse[]> {
    return this.canvasesService.findAll();
  }

  @Get('findCanvasId/:canvasId')
  // Swagger定義
  @ApiOperation({ summary: 'canvasIdから単一キャンバス検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindCanvasResponse })
  @ApiParam({
    name: 'canvasId',
    description: 'キャンバスのId',
    type: String,
  })
  // フックメソッド
  findByCanvasId(
    @Param('canvasId') canvasId: string,
  ): Promise<FindCanvasResponse> {
    return this.canvasesService.findByCanvasId(canvasId);
  }

  @Get('findCanvasName/:canvasName')
  // Swagger定義
  @ApiOperation({ summary: 'canvasNameから単一キャンバス検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindCanvasResponse })
  @ApiParam({
    name: 'canvasName',
    description: 'キャンバス名',
    type: String,
  })
  // フックメソッド
  findByCanvasName(
    @Param('canvasName') canvasName: string,
  ): Promise<FindCanvasResponse> {
    return this.canvasesService.findByCanvasName(canvasName);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':canvasId')
  // Swagger定義
  @ApiOperation({ summary: 'キャンバス更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateCanvasResponse })
  @ApiParam({
    name: 'canvasId',
    description: 'canvasId',
    type: String,
  })
  @ApiBody({ type: UpdateCanvasRequest, description: '更新データ' })
  // フックメソッド
  update(@Req() req: FastifyRequest, @Body() data: UpdateCanvasRequest) {
    return this.canvasesService.updateCanvas(req, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':canvasId')
  // Swagger定義
  @ApiOperation({ summary: 'キャンバス削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveCanvasResponse })
  @ApiParam({
    name: 'canvasId',
    description: 'canvasId',
    type: String,
  })
  // フックメソッド
  remove(@Req() req: FastifyRequest): Promise<RemoveCanvasResponse> {
    return this.canvasesService.removeCanvasData(req);
  }
}
