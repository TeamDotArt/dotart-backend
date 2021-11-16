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

export interface AuthServiceInterface {
  // get pasic pallet
  validateUser(data: LogInUserRequest): Promise<ValidateUserResponse | null>;
  login(data: LogInUserRequest): Promise<LogInUserResponse>;
  logout(authorization: FastifyRequest): Promise<LogOutUserResponse>;

  // create basic pallet
  signup(user: CreateUserRequest): Promise<VerifyEmailResponse>;

  // update basic pallet
  emailConfirm(emailToken: string): Promise<ConfirmedUserResponse>;

  // delete basic pallet
  passwordResetRequest(
    authorization: FastifyRequest,
  ): Promise<PasswordResetReqResponse>;
  passwordReset(
    token: string,
    data: PasswordResetRequest,
  ): Promise<PasswordResetResponse>;

  me(authorization: FastifyRequest): Promise<MeResponse>;
}
