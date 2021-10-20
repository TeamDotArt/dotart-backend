import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserPallet } from '@prisma/client';
import { UserpalletService } from './user-pallet.service';
import { CreateUserPalletRequest } from './dto/create-user-pallet.dto';
import { UpdateUserPalletRequest } from './dto/update-user-pallet.dto';
import { FindAllUserPalletResponse } from './dto/findAll-user-pallet.dto';
import { FindUserPalletResponse } from './dto/find-user-pallet.dto';
import { FastifyRequest } from 'fastify';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// TODO: ApiResponseを記載する
@ApiTags('user-pallet')
@Controller('user-pallet')
export class UserPalletController {
  constructor(private readonly userPalletService: UserpalletService) {}

  @Post()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット生成' })
  // フックメソッド
  create(@Body() createUserPalletRequest: CreateUserPalletRequest) {
    return;
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット更新' })
  // フックメソッド
  async updateProfileData(
    @Req() req: FastifyRequest,
    @Body() data: Prisma.UserPalletUpdateInput,
  ): Promise<UpdateUserPalletRequest> {
    return this.userPalletService.updateUserPalletData(req, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  // Swagger定義
  @ApiOperation({ summary: 'ユーザパレット削除' })
  // フックメソッド
  async removeUserPalletData(@Req() req: FastifyRequest): Promise<UserPallet> {
    return this.userPalletService.removeUserPalletData(req);
  }
}
