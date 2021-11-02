import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
// Service
import { UsersService } from './users.service';
// Guards
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
// Dto
import { FindAllUserResponse } from './dto/findAll-user.dto';
import { FindUserResponse, FindUserParam } from './dto/find-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { RemoveUserResponse } from './dto/remove-user.dto';

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
  @ApiResponse({ status: HttpStatus.OK, type: FindAllUserResponse })
  // フックメソッド
  async findAll(): Promise<FindAllUserResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  // Swagger定義
  @ApiOperation({ summary: 'userIdから単一ユーザ検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindUserResponse })
  @ApiParam({
    name: 'userId',
    description: 'ユーザのId',
    type: String,
  })
  // フックメソッド
  async findByUserId(
    @Param() userParam: FindUserParam,
  ): Promise<FindUserResponse> {
    return this.usersService.getUserProfileByUserId(userParam.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザデータ更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserResponse })
  @ApiBody({ type: UpdateUserRequest, description: '更新データ' })
  // フックメソッド
  async updateProfileData(
    @Req() req: FastifyRequest,
    @Body() data: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    return this.usersService.updateProfileData(req, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  // Swagger定義
  @ApiOperation({ summary: 'ユーザデータ削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveUserResponse })
  // フックメソッド
  async removeAccountData(
    @Req() req: FastifyRequest,
  ): Promise<RemoveUserResponse> {
    return this.usersService.removeAccountData(req);
  }
}
