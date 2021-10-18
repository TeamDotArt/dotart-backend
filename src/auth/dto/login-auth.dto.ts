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
import { User } from 'src/users/entities/user.entity';

type PasswordOmitUser = Omit<User, 'password'>;

export class LogInUserRequest {
  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_USER_ID,
  })
  @IsString()
  userId: User['userId'];

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: User['password'];
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
  id: User['id'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsNotEmpty()
  @IsString()
  userId: User['userId'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL })
  @IsEmail()
  email: User['email'];

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  name: User['name'];

  @ApiProperty({ description: Constants.PROPERTY_ROLE })
  role: User['role'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_VERIFIED })
  @IsBoolean()
  emailVerified: User['emailVerified'];

  @ApiProperty({ description: Constants.PROPERTY_HASH_ACTIVETION })
  @IsString()
  hashActivation: User['hashActivation'];

  @ApiProperty({ description: Constants.PROPERTY_ACTIVE })
  @IsBoolean()
  active: User['active'];

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  createdAt: User['createdAt'];

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  updatedAt: User['updatedAt'];

  @ApiProperty({ description: Constants.PROPERTY_CONFIRMED_AT })
  @IsDate()
  confirmedAt: User['confirmedAt'];
}
