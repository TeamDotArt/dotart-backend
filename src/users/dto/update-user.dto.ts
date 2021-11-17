import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Constants } from '../../common/constants';
import { User } from '../entities/user.entity';

export class UpdateUserRequest {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsNotEmpty()
  @IsString()
  userId: User['userId'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL })
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_EMAIL,
  })
  @IsEmail()
  email: User['email'];

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: User['password'];

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  name: User['name'];
}

export class UpdateUserResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;
}
