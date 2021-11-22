import { ApiProperty } from '@nestjs/swagger';
import { Token, UserPallet, User as PrismaUser } from '@prisma/client';
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
import { Constants } from '../../common/constants';

export class User {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  @IsNotEmpty()
  @Exclude()
  id: PrismaUser['id'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  userId: PrismaUser['userId'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL })
  @IsEmail()
  email: PrismaUser['email'];

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: PrismaUser['password'];

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsOptional()
  @IsString()
  name: PrismaUser['name'];

  @ApiProperty({ description: Constants.PROPERTY_ROLE })
  @IsOptional()
  role: PrismaUser['role'];

  // 子要素系

  @IsOptional()
  @ApiProperty({ description: Constants.PROPERTY_USER_PALLET })
  userPallet?: UserPallet[];

  @IsOptional()
  @ApiProperty({ description: Constants.PROPERTY_TOKEN })
  token?: Token;

  // 認証系

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_VERIFIED })
  @IsBoolean()
  @Exclude()
  emailVerified: PrismaUser['emailVerified'];

  @ApiProperty({ description: Constants.PROPERTY_ACTIVE })
  @IsBoolean()
  @Exclude()
  isLoggedIn: PrismaUser['isLoggedIn'];

  @ApiProperty({ description: Constants.PROPERTY_LOGIN_TYPE })
  @IsOptional()
  @IsString()
  loginType: PrismaUser['loginType'];

  // 時間系

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  @Exclude()
  createdAt: PrismaUser['createdAt'];

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  @Exclude()
  updatedAt: PrismaUser['updatedAt'];

  @ApiProperty({ description: Constants.PROPERTY_CONFIRMED_AT })
  @IsDate()
  @Exclude()
  confirmedAt: PrismaUser['confirmedAt'];
}
