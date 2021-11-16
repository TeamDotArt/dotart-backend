import { AccessTokenResponse } from '../dto/access-token.dto';
import { EmailTokenResponse } from '../dto/email-token.dto';
import { PasswordTokenResponse } from '../dto/password-token.dto';
import { RefreshTokenResponse } from '../dto/refresh-token.dto';
import { RemoveTokenResponse } from '../dto/remove-token.dto';
import { UserIdResponse } from '../dto/user-id.dto';

export interface TokenServiceInterface {
  // get pasic pallet
  getToken(userId: string): Promise<AccessTokenResponse>;
  getRefreshToken(userId: string): Promise<RefreshTokenResponse>;
  getEmailToken(userId: string): Promise<EmailTokenResponse>;
  getPasswordToken(userId: string): Promise<PasswordTokenResponse>;

  getUserIdByEmailToken(emailToken: string): Promise<UserIdResponse>;
  getUserIdByPasswordToken(passwordToken: string): Promise<UserIdResponse>;

  // create basic pallet
  createEmailToken(userId: string): Promise<EmailTokenResponse>;

  // set
  setAccessToken(
    accessToken: string,
    userId: string,
  ): Promise<AccessTokenResponse>;

  setPasswordToken(
    userId: string,
    passwordToken: string | null,
  ): Promise<PasswordTokenResponse>;

  // delete basic pallet
  removeTokenByUserId(userId: string): Promise<RemoveTokenResponse>;
}
