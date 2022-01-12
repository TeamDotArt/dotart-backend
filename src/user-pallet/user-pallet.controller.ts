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
import { UserPalletControllerInterface } from './interface/userPallet.controller.interface';
import { UserPalletServiceInterface } from './interface/userPallet.service.interface';
// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// Dto
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
import {
  RemoveUserPalletRequest,
  RemoveUserPalletResponse,
} from './dto/delete-user-pallet.dto';

@ApiTags('user-pallet')
@Controller('user-pallet')
export class UserPalletController implements UserPalletControllerInterface {
  constructor(
    @Inject('UserPalletServiceInterface')
    private readonly _userPalletService: UserPalletServiceInterface,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット生成' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateUserPalletResponse })
  @ApiBody({
    type: CreateUserPalletRequest,
    description: 'ユーザーパレットの詳細情報',
  })
  // フックメソッド
  async createUserPallet(
    @Req() authorization: FastifyRequest,
    @Body() data: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse> {
    return this._userPalletService.create(authorization, data);
  }

  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全ユーザパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindAllUserPalletResponse })
  // フックメソッド
  async getUserPallets(): Promise<FindAllUserPalletResponse[]> {
    return this._userPalletService.findAll();
  }

  @Get('findPalletId/:palletId')
  // Swagger定義
  @ApiOperation({ summary: 'palletIdから単一ユーザパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindUserPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ユーザパレットのId',
    type: String,
  })
  // フックメソッド
  async getUserPallet(
    @Param('palletId') palletId: string,
  ): Promise<FindUserPalletResponse> {
    return this._userPalletService.findUserPalletId(palletId);
  }

  @Get('findPalletName/:name')
  // Swagger定義
  @ApiOperation({ summary: 'nameから単一ユーザパレット検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindUserPalletResponse })
  @ApiParam({
    name: 'name',
    description: 'ユーザパレットのname',
    type: String,
  })
  // フックメソッド
  async getUserPalletByName(
    @Param('name') name: string,
  ): Promise<FindUserPalletResponse> {
    return this._userPalletService.findUserPalletByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':palletId')
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ユーザパレットのpallteId',
    type: String,
  })
  @ApiBody({ type: UpdateUserPalletRequest, description: '更新データ' })
  // フックメソッド
  async updateUserPallet(
    @Req() authorization: FastifyRequest,
    @Body() data: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse> {
    return this._userPalletService.update(authorization, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':palletId')
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveUserPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ユーザパレットのpalletId',
    type: String,
  })
  // フックメソッド
  async deleteUserPallet(
    @Req() authorization: FastifyRequest,
    @Body() data: RemoveUserPalletRequest,
  ): Promise<RemoveUserPalletResponse> {
    return this._userPalletService.remove(authorization, data);
  }
}
