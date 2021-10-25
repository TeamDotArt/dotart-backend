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
import { RemoveBasicPalletResponse } from './dto/delete-basic-pallet.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';

// TODO: ApiResponseを記載する
@ApiTags('basic-pallet')
@Controller('basic-pallet')
export class BasicPalletController {
  constructor(private readonly basicPalletService: BasicPalletService) {}

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
  async findByBasicPalletId(
    @Param('palletId') palletId: string,
  ): Promise<FindBasicPalletResponse> {
    return this.basicPalletService.findByBasicPalletId(palletId);
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
  async findByName(
    @Param('name') name: string,
  ): Promise<FindBasicPalletResponse> {
    return this.basicPalletService.findByName(name);
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
  async updateProfileData(
    @Param('palletId') palletId: string,
    @Body() data: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse> {
    return this.basicPalletService.updateBasicPalletData(palletId, data);
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
  async removeBasicPalletData(
    @Param('palletId') palletId: string,
  ): Promise<RemoveBasicPalletResponse> {
    return this.basicPalletService.removeBasicPalletData(palletId);
  }
}
