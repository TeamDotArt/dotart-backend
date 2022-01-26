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
  Inject,
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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// Dto
import {
  RemoveCanvasRequest,
  RemoveCanvasResponse,
} from './dto/delete-canvas.dto';
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
  constructor(
    @Inject('CanvasesServiceInterface')
    private readonly _canvasesService: CanvasesServiceInterface,
  ) {}

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
    @Req() authorization: FastifyRequest,
    @Body() data: CreateCanvasRequest,
  ): Promise<CreateCanvasResponse> {
    return this._canvasesService.create(authorization, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全キャンバス検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindAllCanvasResponse })
  // フックメソッド
  getCanvases(
    @Req() authorization: FastifyRequest,
  ): Promise<FindAllCanvasResponse[]> {
    return this._canvasesService.findAll(authorization);
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
    return this._canvasesService.findCanvasId(canvasParam.canvasId);
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
    return this._canvasesService.findCanvasByName(canvasParam.canvasName);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  // Swagger定義
  @ApiOperation({ summary: 'キャンバス更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateCanvasResponse })
  @ApiBody({ type: UpdateCanvasRequest, description: '更新データ' })
  // フックメソッド
  updateCanvas(
    @Req() authorization: FastifyRequest,
    @Body() data: UpdateCanvasRequest,
  ): Promise<UpdateCanvasResponse> {
    return this._canvasesService.update(authorization, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  // Swagger定義
  @ApiOperation({ summary: 'キャンバス削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveCanvasRequest })
  // フックメソッド
  deleteCanvas(
    @Req() authorization: FastifyRequest,
    @Body() data: RemoveCanvasRequest,
  ): Promise<RemoveCanvasResponse> {
    return this._canvasesService.remove(authorization, data);
  }
}
