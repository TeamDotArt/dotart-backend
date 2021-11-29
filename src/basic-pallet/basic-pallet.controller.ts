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
  Inject,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
// interface
import { BasicPalletControllerInterface } from './interface/basicPallet.controller.interface';
import { BasicPalletServiceInterface } from './interface/basicPallet.service.interface';
// Guards
import { RoleGuard } from '../auth/guards/role.guard';
// Dto
import { RemoveBasicPalletResponse } from './dto/delete-basic-pallet.dto';
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

@ApiTags('basic-pallet')
@Controller('basic-pallet')
export class BasicPalletController implements BasicPalletControllerInterface {
  constructor(
    @Inject('BasicPalletServiceInterface')
    private readonly _basicPalletService: BasicPalletServiceInterface,
  ) {}

  @UseGuards(RoleGuard)
  @Post()
  // Swagger定義
  @ApiOperation({
    summary: 'ベーシックパレット生成（ロールがADMINのユーザーのみ）',
  })
  @ApiResponse({ status: HttpStatus.OK, type: CreateBasicPalletResponse })
  @ApiBody({
    type: CreateBasicPalletRequest,
    description: 'ベーシックパレットの詳細情報',
  })
  // フックメソッド
  async createBasicPallet(
    @Body() basicPallet: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse> {
    return this._basicPalletService.create(basicPallet);
  }

  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全ベーシックパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindAllBasicPalletResponse })
  // フックメソッド
  async getBasicPallets(): Promise<FindAllBasicPalletResponse[]> {
    return this._basicPalletService.findAll();
  }

  @Get('findPalletId/:palletId')
  // Swagger定義
  @ApiOperation({ summary: 'palletIdから単一ベーシックパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindBasicPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ベーシックパレットのpalletId',
    type: String,
  })
  // フックメソッド
  async getBasicPallet(
    @Param('palletId') basicPalletId: string,
  ): Promise<FindBasicPalletResponse> {
    return this._basicPalletService.findBasicPalletId(basicPalletId);
  }

  @Get('findName/:name')
  // Swagger定義
  @ApiOperation({ summary: 'パレット名から単一ベーシックパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindBasicPalletResponse })
  @ApiParam({
    name: 'name',
    description: 'ベーシックパレットの名前',
    type: String,
  })
  // フックメソッド
  async getBasicPalletByName(
    @Param('name') name: string,
  ): Promise<FindBasicPalletResponse> {
    return this._basicPalletService.findBasicPalletByName(name);
  }

  @UseGuards(RoleGuard)
  @Patch(':palletId')
  // Swagger定義
  @ApiOperation({
    summary: 'ベーシックパレット更新（ロールがADMINのユーザーのみ）',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateBasicPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ベーシックパレットのpallteId',
    type: String,
  })
  @ApiBody({ type: UpdateBasicPalletRequest, description: '更新データ' })
  // フックメソッド
  async updateBasicPallet(
    @Param('palletId') basicPalletId: string,
    @Body() basicPallet: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse> {
    return this._basicPalletService.update(basicPalletId, basicPallet);
  }

  @UseGuards(RoleGuard)
  @Delete(':palletId')
  // Swagger定義
  @ApiOperation({
    summary: 'ベーシックパレット削除（ロールがADMINのユーザーのみ）',
  })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveBasicPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ベーシックパレットのpalletId',
    type: String,
  })
  // フックメソッド
  async deleteBasicPallet(
    @Param('palletId') basicPalletId: string,
  ): Promise<RemoveBasicPalletResponse> {
    return this._basicPalletService.remove(basicPalletId);
  }
}
