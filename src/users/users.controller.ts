import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
// Service
import { UsersService } from './users.service';
// Guards
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
// entity
import { User } from './entities/user.entity';
// Dto
import { FindAllUserResponse } from './dto/findAll-user.dto';

// TODO: ApiResponseを記載する
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全ユーザ検索(ロールがADMINのユーザのみ)' })
  // フックメソッド
  async findAll(): Promise<FindAllUserResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  // Swagger定義
  @ApiOperation({ summary: 'IDから単一ユーザ検索' })
  // フックメソッド
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  // Swagger定義
  @ApiOperation({ summary: 'IDからユーザデータ更新' })
  // フックメソッド
  update(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.update(+id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  // Swagger定義
  @ApiOperation({ summary: 'IDからユーザデータ削除' })
  // フックメソッド
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
