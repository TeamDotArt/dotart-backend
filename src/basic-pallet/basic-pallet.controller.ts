import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { BasicPalletService } from './basic-pallet.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateBasicPalletRequest,
  CreateBasicPalletResponse,
} from './dto/create-basic-pallet.dto';
import { FindAllBasicPalletResponse } from './dto/findAll-basic-pallet.dto';
import { FindBasicPalletResponse } from './dto/find-basic-pallet.dto';
import {
  UpdateBasicPalletRequest,
  UpdateBasicPalletResponse,
} from './dto/update-basic-pallet.dto';
import { FastifyRequest } from 'fastify';
import { RemoveBasicPalletResponse } from './dto/delete-basic-pallet.dto';

// TODO: ApiResponseを記載する
@ApiTags('basic-pallet')
@Controller('basic-pallet')
export class BasicPalletController {
  constructor(private readonly basicPalletService: BasicPalletService) {}

  @Post()
  // Swagger定義
  @ApiOperation({ summary: 'ベーシックパレット生成' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateBasicPalletResponse })
  @ApiBody({
    type: CreateBasicPalletRequest,
    description: 'ベーシックパレットの詳細情報',
  })
  // フックメソッド
  async create(
    @Body() data: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse> {
    return this.basicPalletService.create(data);
  }

  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全ベーシックパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindAllBasicPalletResponse })
  // フックメソッド
  async findAll(): Promise<FindAllBasicPalletResponse[]> {
    return this.basicPalletService.findAll();
  }

  @Get(':palletId')
  // Swagger定義
  @ApiOperation({ summary: 'palletIdから単一ベーシックパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindBasicPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ベーシックパレットのId',
    type: String,
  })
  // フックメソッド
  async findByBasicPalletId(
    @Param('palletId') palletId: number,
  ): Promise<FindBasicPalletResponse> {
    return this.basicPalletService.findByBasicPalletId(palletId);
  }

  @Patch()
  // Swagger定義
  @ApiOperation({ summary: 'ベーシックパレット更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateBasicPalletResponse })
  @ApiBody({ type: UpdateBasicPalletRequest, description: '更新データ' })
  // フックメソッド
  async updateProfileData(
    @Req() req: FastifyRequest,
    @Body() data: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse> {
    return this.basicPalletService.updateBasicPalletData(req, data);
  }

  @Delete(':id')
  // Swagger定義
  @ApiOperation({ summary: 'ベーシックパレット削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveBasicPalletResponse })
  // フックメソッド
  async removeBasicPalletData(
    @Req() req: FastifyRequest,
  ): Promise<RemoveBasicPalletResponse> {
    return this.basicPalletService.removeBasicPalletData(req);
  }
}
