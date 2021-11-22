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
import { Constants } from '../../common/constants';
import { ResponseBase } from '../../common/dtoBase/response.dtoBase';
import { User } from '../../users/entities/user.entity';

type PasswordOmitUser = Omit<User, 'password'>;

export class LogInUserRequest {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
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

export class LogInUserResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_TOKEN })
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

  @ApiProperty({ description: Constants.PROPERTY_ACTIVE })
  @IsBoolean()
  isLoggedIn: User['isLoggedIn'];

  @ApiProperty({ description: Constants.PROPERTY_LOGIN_TYPE })
  @IsString()
  loginType: User['loginType'];

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
