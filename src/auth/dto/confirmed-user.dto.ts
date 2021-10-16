import { Role } from '@prisma/client';
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
import { Constants } from 'src/common/constants';

export class ConfirmedUserDto {
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

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  @Exclude()
  password: string;

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_VERIFIED })
  @IsBoolean()
  @Exclude()
  emailVerified: boolean;

  @ApiProperty({ description: Constants.PROPERTY_HASH_ACTIVETION })
  @IsString()
  @Exclude()
  hashActivation: string;

  @ApiProperty({ description: Constants.PROPERTY_ACTIVE })
  @IsBoolean()
  @Exclude()
  active: boolean;

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  @Exclude()
  createdAt: Date;

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  @Exclude()
  updatedAt: Date;

  @ApiProperty({ description: Constants.PROPERTY_CONFIRMED_AT })
  @IsDate()
  @Exclude()
  confirmedAt: Date;
}
