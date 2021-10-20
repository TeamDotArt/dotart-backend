import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserPallet } from '@prisma/client';
import { UserpalletService } from './user-pallet.service';
import { CreateUserPalletRequest } from './dto/create-user-pallet.dto';
import { UpdateUserPalletRequest } from './dto/update-user-pallet.dto';

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

  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全ユーザパレット検索' })
  // フックメソッド
  findAll(): Promise<UserPallet[]> {
    return this.userPalletService.findAll();
  }

  @Get(':id')
  // Swagger定義
  @ApiOperation({ summary: 'IDから単一ユーザパレット検索' })
  // フックメソッド
  findOne(@Param('id') id: string): Promise<UserPallet> {
    return this.userPalletService.findOne(+id);
  }

  @Patch(':id')
  // Swagger定義
  @ApiOperation({ summary: 'IDからユーザパレット更新' })
  // フックメソッド
  update(
    @Param('id') id: string,
    @Body() updateUserPalletRequest: UpdateUserPalletRequest,
  ) {
    return;
  }

  @Delete(':id')
  // Swagger定義
  @ApiOperation({ summary: 'IDからユーザパレット削除' })
  // フックメソッド
  remove(@Param('id') id: string): Promise<UserPallet> {
    return this.userPalletService.remove(+id);
  }
}
