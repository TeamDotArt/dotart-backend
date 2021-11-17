import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsBoolean,
  MinLength,
} from 'class-validator';
import { Constants } from '../../common/constants';
import { User } from '../../users/entities/user.entity';

export class ConfirmedUserResponse {
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

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  @Exclude()
  password: User['password'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_VERIFIED })
  @IsBoolean()
  @Exclude()
  emailVerified: User['emailVerified'];

  @ApiProperty({ description: Constants.PROPERTY_ACTIVE })
  @IsBoolean()
  @Exclude()
  active: User['active'];

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  @Exclude()
  createdAt: User['createdAt'];

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  @Exclude()
  updatedAt: User['updatedAt'];

  @ApiProperty({ description: Constants.PROPERTY_CONFIRMED_AT })
  @IsDate()
  @Exclude()
  confirmedAt: User['confirmedAt'];
}
