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
// Interface
import { CanvasesServiceInterface } from './interface/canvases.service.interface';
// Guards
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// Dto
import { RemoveCanvasResponse } from './dto/delete-canvas.dto';
import { FindAllCanvasResponse } from './dto/findAll-canvas.dto';
import { FindCanvasResponse, FindCanvasParam } from './dto/find-canvas.dto';
import { CanvasesControllerInterface } from './interface/canvases.controller.interface';
import {
  CreateCanvasRequest,
  CreateCanvasResponse,
} from './dto/create-canvas.dto';
import {
  UpdateCanvasRequest,
  UpdateCanvasResponse,
} from './dto/update-canvas.dto';

@ApiTags('canvases')
@Controller('canvases')
export class CanvasesController implements CanvasesControllerInterface {
  constructor(private readonly canvasesService: CanvasesServiceInterface) {}

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
  createCanvas(
    @Req() req: FastifyRequest,
    @Body() data: CreateCanvasRequest,
  ): Promise<CreateCanvasResponse> {
    return this.canvasesService.create(req, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全キャンバス検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindAllCanvasResponse })
  // フックメソッド
  getCanvases(@Req() req: FastifyRequest): Promise<FindAllCanvasResponse[]> {
    return this.canvasesService.findAll(req);
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
  getCanvas(
    @Param() canvasParam: FindCanvasParam,
  ): Promise<FindCanvasResponse> {
    return this.canvasesService.findCanvasId(canvasParam.canvasId);
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
  getCanvasByName(
    @Param() canvasParam: FindCanvasParam,
  ): Promise<FindCanvasResponse> {
    return this.canvasesService.findCanvasByName(canvasParam.canvasName);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  // Swagger定義
  @ApiOperation({ summary: 'キャンバス更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateCanvasResponse })
  @ApiBody({ type: UpdateCanvasRequest, description: '更新データ' })
  // フックメソッド
  updateCanvas(
    @Req() req: FastifyRequest,
    @Body() data: UpdateCanvasRequest,
  ): Promise<UpdateCanvasResponse> {
    return this.canvasesService.update(req, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  // Swagger定義
  @ApiOperation({ summary: 'キャンバス削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveCanvasResponse })
  // フックメソッド
  deleteCanvas(
    @Req() req: FastifyRequest,
    @Body() data: RemoveCanvasResponse,
  ): Promise<RemoveCanvasResponse> {
    return this.canvasesService.remove(req, data);
  }
}
