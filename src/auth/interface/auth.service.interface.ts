import { FastifyRequest } from 'fastify';
import { ConfirmedUserResponse } from '../dto/confirmed-user.dto';
import { CreateUserRequest } from '../dto/create-user.dto';
import { VerifyEmailResponse } from '../dto/verify-email.dto';
import { LogOutUserResponse } from '../dto/logout-auth.dto';
import { MeResponse } from '../dto/me-auth.dto';
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

/** @implements {AuthService}
 * AuthServiceのインターフェース
 */
export interface AuthServiceInterface {
  // ユーザのバリデーション
  validateUser(data: LogInUserRequest): Promise<ValidateUserResponse | null>;
  // ログイン処理
  login(data: LogInUserRequest): Promise<LogInUserResponse>;
  // ログアウト処理
  logout(authorization: FastifyRequest): Promise<LogOutUserResponse>;
  // アカウント作成の処理
  signup(user: CreateUserRequest): Promise<VerifyEmailResponse>;
  // メール認証の処理
  emailConfirm(emailToken: string): Promise<ConfirmedUserResponse>;
  // パスワードリセットのリクエスト処理
  passwordResetRequest(
    authorization: FastifyRequest,
  ): Promise<PasswordResetReqResponse>;
  // パスワードリセットの処理
  passwordReset(
    token: string,
    data: PasswordResetRequest,
  ): Promise<PasswordResetResponse>;
  // ログイン情報の処理
  me(authorization: FastifyRequest): Promise<MeResponse>;
}
