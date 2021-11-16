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
// サービス
import { AppService } from './app.service';
// ガード
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
// DTO
import { ConfirmedUserResponse } from './auth/dto/confirmed-user.dto';
import { CreateUserRequest } from './auth/dto/create-user.dto';
import { EmailTokenParam } from './auth/dto/email-token.dto';
import {
  LogInUserRequest,
  LogInUserResponse,
  ValidateUserResponse,
} from './auth/dto/login-auth.dto';
import { LogOutUserResponse } from './auth/dto/logout-auth.dto';
import {
  PasswordResetParam,
  PasswordResetReqResponse,
  PasswordResetRequest,
  PasswordResetResponse,
} from './auth/dto/passwordReset-user.dto';
import { VerifyEmailResponse } from './auth/dto/verify-email.dto';
import { AuthServiceInterface } from './auth/interface/auth.service.interface';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
    private readonly appService: AppService,
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
  logout(@Req() req: FastifyRequest): Promise<LogOutUserResponse> {
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
  @ApiBody({ type: CreateUserRequest, description: 'ユーザ情報' })
  // フックメソッド
  createUser(@Body() body: CreateUserRequest): Promise<VerifyEmailResponse> {
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
    type: EmailTokenParam,
  })
  // フックメソッド
  confirmEmail(
    @Param() emailToken: EmailTokenParam,
  ): Promise<ConfirmedUserResponse> {
    console.log(emailToken);
    return this.authService.emailConfirm(emailToken.emailToken);
  }

  /**
   * @description パスワードリセットリクエスト認証API
   */
  @UseGuards(JwtAuthGuard)
  @Post('passwordResetReq')
  // Swagger定義
  @ApiOperation({ summary: 'パスワードリセットのリクエストを行う' })
  @ApiResponse({ status: HttpStatus.OK, type: PasswordResetReqResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundException })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    type: NotAcceptableException,
  })
  // フックメソッド
  passwordResetReq(
    @Request() req: FastifyRequest,
  ): Promise<PasswordResetReqResponse> {
    return this.authService.passwordResetRequest(req);
  }

  /**
   * @description パスワードリセット認証API
   */
  @Post(':passwordToken/passwordReset')
  // Swagger定義
  @ApiOperation({ summary: 'パスワードリセットを行う' })
  @ApiResponse({ status: HttpStatus.OK, type: PasswordResetResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundException })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    type: NotAcceptableException,
  })
  @ApiParam({
    name: 'passwordToken',
    description: 'passwordToken情報',
    type: PasswordResetParam,
  })
  @ApiBody({ type: PasswordResetRequest, description: 'パスワード' })
  // フックメソッド
  passwordReset(
    @Param() passwordToken: PasswordResetParam,
    @Body() data: PasswordResetRequest,
  ): Promise<PasswordResetResponse> {
    return this.authService.passwordReset(passwordToken.passwordToken, data);
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
  getProfile(@Request() req: FastifyRequest) {
    return this.authService.me(req);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
