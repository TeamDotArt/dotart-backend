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
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserpalletService } from './user-pallet.service';
import {
  CreateUserPalletRequest,
  CreateUserPalletResponse,
} from './dto/create-user-pallet.dto';
import {
  UpdateUserPalletRequest,
  UpdateUserPalletResponse,
} from './dto/update-user-pallet.dto';
import { FindAllUserPalletResponse } from './dto/findAll-user-pallet.dto';
import { FindUserPalletResponse } from './dto/find-user-pallet.dto';
import { FastifyRequest } from 'fastify';
import { RemoveUserPalletResponse } from './dto/delete-user-pallet.dto';

// TODO: ApiResponseを記載する
@ApiTags('user-pallet')
@Controller('user-pallet')
export class UserPalletController {
  constructor(private readonly userPalletService: UserpalletService) {}

  @Post()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット生成' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateUserPalletResponse })
  @ApiBody({ type: CreateUserPalletRequest, description: '生成データ' })
  // フックメソッド
  async create(
    @Body() data: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse> {
    return this.userPalletService.create(data);
  }

  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全ユーザパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindAllUserPalletResponse })
  // フックメソッド
  async findAll(): Promise<FindAllUserPalletResponse[]> {
    return this.userPalletService.findAll();
  }

  @Get(':palletId')
  // Swagger定義
  @ApiOperation({ summary: 'palletIdから単一ユーザパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindUserPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ユーザパレットのId',
    type: String,
  })
  // フックメソッド
  async findByUserPalletId(
    @Param('palletId') palletId: number,
  ): Promise<FindUserPalletResponse> {
    return this.userPalletService.findByUserPalletId(palletId);
  }

  @Patch()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserPalletResponse })
  @ApiBody({ type: UpdateUserPalletRequest, description: '更新データ' })
  // フックメソッド
  async updateProfileData(
    @Req() req: FastifyRequest,
    @Body() data: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse> {
    return this.userPalletService.updateUserPalletData(req, data);
  }

  @Delete(':id')
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveUserPalletResponse })
  // フックメソッド
  async removeUserPalletData(
    @Req() req: FastifyRequest,
  ): Promise<RemoveUserPalletResponse> {
    return this.userPalletService.removeUserPalletData(req);
  }
}
