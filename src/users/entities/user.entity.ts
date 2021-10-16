import { ApiProperty } from '@nestjs/swagger';
import { Role, Token, UserPallet } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { Constants } from 'src/common/constants';

export class User {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  @IsOptional()
  @Exclude()
  id: number;

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  userId: string;

  @ApiProperty({ description: Constants.PROPERTY_EMAIL })
  @IsEmail()
  email: string;

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: string;

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: Constants.PROPERTY_ROLE })
  @IsOptional()
  role: Role;

  // 子要素系

  @IsOptional()
  @ApiProperty({ description: Constants.PROPERTY_USER_PALLET })
  userPallet?: UserPallet[];

  @IsOptional()
  @ApiProperty({ description: Constants.PROPERTY_TOKEN })
  refreshToken?: Token;

  // 認証系

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

  // 時間系

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
