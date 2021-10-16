import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
// サービス
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
// DTO
import { ConfirmedUserDto } from './auth/dto/confirmed-user.dto';
import { LogInUserRequest, LogInUserResponse } from './auth/dto/login-user.dto';
import { LogOutUserResponse } from './auth/dto/logout-user.dto';
import { VerifyEmailDto } from './auth/dto/verify-email.dto';
// ガード
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

type PasswordOmitUser = Omit<User, 'password'>;

// TODO: ApiResponseを記載する
@ApiTags('/')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, type: LogInUserResponse })
  async login(@Body() req: LogInUserRequest): Promise<LogInUserResponse> {
    return this.authService.login(req);
  }

  // TODO: RefreshTokenの実装を行いトークンの無効化も行う
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiResponse({ status: HttpStatus.OK, type: LogOutUserResponse })
  logout(@Req() req: FastifyRequest): Promise<LogOutUserResponse> {
    return this.authService.logout(req);
  }

  @Post('signup')
  @ApiResponse({ status: HttpStatus.OK, type: VerifyEmailDto })
  createUser(@Body() body: User): Promise<VerifyEmailDto> {
    return this.authService.signup(body);
  }

  @Post(':emailToken/confirm')
  @ApiResponse({ status: HttpStatus.OK, type: ConfirmedUserDto })
  confirmEmail(
    @Param('emailToken') emailToken: string,
  ): Promise<ConfirmedUserDto> {
    return this.authService.confirm(emailToken);
  }

  /**
   * @description JWT認証を用いたサンプルAPI
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: PasswordOmitUser }) {
    const user = req.user;

    // 認証に成功したユーザーの情報を返す
    return user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
