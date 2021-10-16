import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Constants } from 'src/common/constants';

export class CreateUserResponse {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_USER_ID,
  })
  userId: string;

  @ApiProperty({ description: Constants.PROPERTY_EMAIL })
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_EMAIL,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: string;

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_VERIFIED })
  @IsString()
  @IsOptional()
  emailToken: string;

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_NAME,
  })
  name: string;
}
