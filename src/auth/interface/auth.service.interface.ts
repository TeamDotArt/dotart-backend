import { FastifyRequest } from 'fastify';
import { ConfirmedUserResponse } from '../dto/confirmed-user.dto';
import { CreateUserRequest } from '../dto/create-user.dto';
import { LogOutUserResponse } from '../dto/logout-auth.dto';
import { VerifyEmailResponse } from '../dto/verify-email.dto';
import {
  LogInUserRequest,
  LogInUserResponse,
  ValidateUserResponse,
} from '../dto/login-auth.dto';
import {
  PasswordResetReqResponse,
  PasswordResetRequest,
  PasswordResetResponse,
} from '../dto/passwordReset-user.dto';
import { MeResponse } from '../dto/me-auth.dto';

export interface AuthServiceInterface {
  // ユーザ認証
  validateUser(
    loginReq: LogInUserRequest,
  ): Promise<ValidateUserResponse | null>;

  // ログイン処理
  login(loginReq: LogInUserRequest): Promise<LogInUserResponse>;
  // ログアウト処理
  logout(logoutReq: FastifyRequest): Promise<LogOutUserResponse>;

  // アカウント作成
  signup(userInfo: CreateUserRequest): Promise<VerifyEmailResponse>;

  // email認証
  emailConfirm(emailToken: string): Promise<ConfirmedUserResponse>;

  // パスワードリセットリクエスト
  passwordResetRequest(
    authorization: FastifyRequest,
  ): Promise<PasswordResetReqResponse>;

  // パスワードリセット認証
  passwordReset(
    token: string,
    changePassword: PasswordResetRequest,
  ): Promise<PasswordResetResponse>;

  // ログインしたユーザ情報
  me(authorization: FastifyRequest): Promise<MeResponse>;
}
