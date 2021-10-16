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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { User } from '@prisma/client';
// サービス
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
// DTO
import { ConfirmedUserDto } from './auth/dto/confirmed-user.dto';
import { LogInUserRequest, LogInUserResponse } from './auth/dto/login-user.dto';
import {
  LogOutUserRequest,
  LogOutUserResponse,
} from './auth/dto/logout-user.dto';
import { VerifyEmailResponse } from './auth/dto/verify-email.dto';
// ガード
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './users/entities/user.entity';

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
  // Swagger定義
  @ApiOperation({ summary: 'ログインを行う' })
  @ApiResponse({ status: HttpStatus.OK, type: LogInUserResponse })
  @ApiBody({ type: LogInUserRequest, description: 'ログイン情報' })
  // フックメソッド
  async login(@Body() req: LogInUserRequest): Promise<LogInUserResponse> {
    return this.authService.login(req);
  }

  // TODO: RefreshTokenの実装を行いトークンの無効化も行う
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  // Swagger定義
  @ApiOperation({ summary: 'ログアウトを行う' })
  @ApiResponse({ status: HttpStatus.OK, type: LogOutUserResponse })
  // フックメソッド
  logout(@Req() req: LogOutUserRequest): Promise<LogOutUserResponse> {
    return this.authService.logout(req);
  }

  @Post('signup')
  // Swagger定義
  @ApiOperation({ summary: '新規アカウント作成を行う' })
  @ApiResponse({ status: HttpStatus.OK, type: VerifyEmailResponse })
  @ApiBody({ type: User, description: 'ユーザ情報' })
  // フックメソッド
  createUser(@Body() body: User): Promise<VerifyEmailResponse> {
    return this.authService.signup(body);
  }

  @Post(':emailToken/confirm')
  // Swagger定義
  @ApiOperation({ summary: 'メール認証を行う' })
  @ApiResponse({ status: HttpStatus.OK, type: ConfirmedUserDto })
  @ApiParam({
    name: 'emailToken',
    description: 'emailToken情報',
    type: String,
  })
  // フックメソッド
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
  // Swagger定義
  @ApiOperation({ summary: 'ログインのガードが働いているかテスト' })
  // フックメソッド
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
