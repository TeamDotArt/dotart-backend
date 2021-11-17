import { AccessTokenResponse } from '../dto/access-token.dto';
import { EmailTokenResponse } from '../dto/email-token.dto';
import { PasswordTokenResponse } from '../dto/password-token.dto';
import { RefreshTokenResponse } from '../dto/refresh-token.dto';
import { RemoveTokenResponse } from '../dto/remove-token.dto';
import { UserIdResponse } from '../dto/user-id.dto';

export interface TokenServiceInterface {
  // トークンの検索処理
  getToken(userId: string): Promise<AccessTokenResponse>;
  // リフレッシュトークンの検索処理
  getRefreshToken(userId: string): Promise<RefreshTokenResponse>;
  // Emailトークンの検索処理
  getEmailToken(userId: string): Promise<EmailTokenResponse>;
  // パスワードトークンの検索処理
  getPasswordToken(userId: string): Promise<PasswordTokenResponse>;

  // EmailトークンからユーザーIDを取得する処理
  getUserIdByEmailToken(emailToken: string): Promise<UserIdResponse>;
  // パスワードトークンからユーザーIDを取得する処理
  getUserIdByPasswordToken(passwordToken: string): Promise<UserIdResponse>;

  // Emailトークンの作成処理
  createEmailToken(userId: string): Promise<EmailTokenResponse>;

  // アクセストークンのセット処理
  setAccessToken(
    accessToken: string,
    userId: string,
  ): Promise<AccessTokenResponse>;

  // パスワードトークンのセット処理
  setPasswordToken(
    userId: string,
    passwordToken: string | null,
  ): Promise<PasswordTokenResponse>;

  // トークンの削除処理
  removeTokenByUserId(userId: string): Promise<RemoveTokenResponse>;
}
