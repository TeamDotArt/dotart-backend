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
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
// Service
import { UserpalletService } from './user-pallet.service';
// Guards
import { RoleGuard } from 'src/auth/guards/role.guard';
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
import { RemoveUserPalletResponse } from './dto/delete-user-pallet.dto';

// TODO: ApiResponseを記載する
@ApiTags('user-pallet')
@Controller('user-pallet')
export class UserPalletController {
  constructor(private readonly userPalletService: UserpalletService) {}

  @UseGuards(RoleGuard)
  @Post()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット生成' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateUserPalletResponse })
  @ApiBody({
    type: CreateUserPalletRequest,
    description: 'ユーザーパレットの詳細情報',
  })
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
  async findByUserPalletId(
    @Param('palletId') palletId: string,
  ): Promise<FindUserPalletResponse> {
    return this.userPalletService.findByUserPalletId(palletId);
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
  async findByUserPalletName(
    @Param('name') name: string,
  ): Promise<FindUserPalletResponse> {
    return this.userPalletService.findByUserPallletName(name);
  }

  @UseGuards(RoleGuard)
  @Patch(':palletId')
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ベーシックパレットのpallteId',
    type: String,
  })
  @ApiBody({ type: UpdateUserPalletRequest, description: '更新データ' })
  // フックメソッド
  async updateProfileData(
    @Param('palletId') palletId: string,
    @Body() data: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse> {
    return this.userPalletService.updateUserPalletData(palletId, data);
  }

  @UseGuards(RoleGuard)
  @Delete(':palletId')
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveUserPalletResponse })
  @ApiParam({
    name: 'palletId',
    description: 'ユーザーパレットのpalletId',
    type: String,
  })
  // フックメソッド
  async removeUserPalletData(
    @Param('palletId') palletId: string,
  ): Promise<RemoveUserPalletResponse> {
    return this.userPalletService.removeUserPalletData(palletId);
  }
}
