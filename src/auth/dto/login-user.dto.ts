import { Role, User } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { Constants } from 'src/common/constants';

type PasswordOmitUser = Omit<User, 'password'>;

export class LogInUserRequest {
  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_USER_ID,
  })
  @IsString()
  userId: string;

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: string;
}

export class LogInUserResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  accessToken: string;
}

export class ValidateUserResponse implements PasswordOmitUser {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  id: number;

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: Constants.PROPERTY_EMAIL })
  @IsEmail()
  email: string;

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  name: string;

  @ApiProperty({ description: Constants.PROPERTY_ROLE })
  role: Role;

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_VERIFIED })
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty({ description: Constants.PROPERTY_HASH_ACTIVETION })
  @IsString()
  hashActivation: string;

  @ApiProperty({ description: Constants.PROPERTY_ACTIVE })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ description: Constants.PROPERTY_CONFIRMED_AT })
  @IsDate()
  confirmedAt: Date;
}
