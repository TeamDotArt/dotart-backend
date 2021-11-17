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
  Inject,
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

// Guards
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
// Dto
import { FindAllUserResponse } from './dto/findAll-user.dto';
import { FindUserParam, FindUserResponse } from './dto/find-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { RemoveUserResponse } from './dto/remove-user.dto';
import { UsersControllerInterface } from './interface/users.controller.interface';
import { UsersServiceInterface } from './interface/users.service.interface';

@ApiTags('users')
@Controller('users')
export class UsersController implements UsersControllerInterface {
  constructor(
    @Inject('UsersServiceInterface')
    private readonly usersService: UsersServiceInterface,
  ) {}

  /**
   * @description ユーザ全取得API
   */
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Get()
  // Swagger定義
  @ApiOperation({ summary: '全ユーザ検索(ロールがADMINのユーザのみ)' })
  @ApiResponse({ status: HttpStatus.OK, type: FindAllUserResponse })
  // フックメソッド
  async getUsers(): Promise<FindAllUserResponse[]> {
    return this.usersService.findAll();
  }

  /**
   * @description ユーザ検索API
   */
  @Get(':userId')
  // Swagger定義
  @ApiOperation({ summary: 'userIdから単一ユーザ検索' })
  @ApiResponse({ status: HttpStatus.OK, type: FindUserResponse })
  @ApiParam({
    name: 'userId',
    description: 'ユーザのId',
    type: FindUserParam,
  })
  // フックメソッド
  async getUser(@Param() userParam: FindUserParam): Promise<FindUserResponse> {
    return this.usersService.getUserProfile(userParam.userId);
  }

  /**
   * @description ユーザ更新API
   */
  @UseGuards(JwtAuthGuard)
  @Patch()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザデータ更新' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserResponse })
  @ApiBody({ type: UpdateUserRequest, description: '更新データ' })
  // フックメソッド
  async updateProfile(
    @Req() authorization: FastifyRequest,
    @Body() data: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    return this.usersService.updateProfile(authorization, data);
  }

  /**
   * @description ユーザ削除API
   */
  @UseGuards(JwtAuthGuard)
  @Delete()
  // Swagger定義
  @ApiOperation({ summary: 'ユーザデータ削除' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveUserResponse })
  // フックメソッド
  async deleteUser(
    @Req() authorization: FastifyRequest,
  ): Promise<RemoveUserResponse> {
    return this.usersService.remove(authorization);
  }
}
