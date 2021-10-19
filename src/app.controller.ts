import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  NotAcceptableException,
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
// サービス
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
// DTO
import { ConfirmedUserResponse } from './auth/dto/confirmed-user.dto';
import {
  LogInUserRequest,
  LogInUserResponse,
  ValidateUserResponse,
} from './auth/dto/login-auth.dto';
import {
  LogOutUserRequest,
  LogOutUserResponse,
} from './auth/dto/logout-auth.dto';
import { VerifyEmailResponse } from './auth/dto/verify-email.dto';
// ガード
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './users/entities/user.entity';

// TODO: ApiResponseを記載する
@ApiTags('/')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  /**
   * @description ログインAPI
   */
  @Post('login')
  // Swagger定義
  @ApiOperation({ summary: 'ログインを行う' })
  @ApiResponse({ status: HttpStatus.OK, type: LogInUserResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundException })
  @ApiBody({ type: LogInUserRequest, description: 'ログイン情報' })
  // フックメソッド
  async login(@Body() req: LogInUserRequest): Promise<LogInUserResponse> {
    return this.authService.login(req);
  }

  /**
   * @description ログアウトAPI
   */
  // TODO: RefreshTokenの実装を行いトークンの無効化も行う
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  // Swagger定義
  @ApiOperation({ summary: 'ログアウトを行う' })
  @ApiResponse({ status: HttpStatus.OK, type: LogOutUserResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundException })
  // フックメソッド
  logout(@Req() req: LogOutUserRequest): Promise<LogOutUserResponse> {
    return this.authService.logout(req);
  }

  /**
   * @description サインインAPI
   */
  @Post('signup')
  // Swagger定義
  @ApiOperation({ summary: '新規アカウント作成を行う' })
  @ApiResponse({ status: HttpStatus.OK, type: VerifyEmailResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundException })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    type: NotAcceptableException,
  })
  @ApiBody({ type: User, description: 'ユーザ情報' })
  // フックメソッド
  createUser(@Body() body: User): Promise<VerifyEmailResponse> {
    return this.authService.signup(body);
  }

  /**
   * @description メール認証API
   */
  @Post(':emailToken/confirm')
  // Swagger定義
  @ApiOperation({ summary: 'メール認証を行う' })
  @ApiResponse({ status: HttpStatus.OK, type: ConfirmedUserResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundException })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    type: NotAcceptableException,
  })
  @ApiParam({
    name: 'emailToken',
    description: 'emailToken情報',
    type: String,
  })
  // フックメソッド
  confirmEmail(
    @Param('emailToken') emailToken: string,
  ): Promise<ConfirmedUserResponse> {
    return this.authService.confirm(emailToken);
  }

  /**
   * @description JWT認証を用いたサンプルAPI
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  // Swagger定義
  @ApiOperation({ summary: 'ログインのガードが働いているかテスト' })
  @ApiResponse({ status: HttpStatus.OK, type: ValidateUserResponse })
  // フックメソッド
  getProfile(@Request() req: ValidateUserResponse) {
    const user = req;

    // 認証に成功したユーザーの情報を返す
    return user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
