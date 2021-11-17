import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Constants } from '../../common/constants';
import { User } from '../../users/entities/user.entity';

export class MeResponse {
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

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_VERIFIED })
  @IsString()
  emailVerified: string;

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  createdAt: User['createdAt'];

  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;
}
