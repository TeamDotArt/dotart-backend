import { ApiProperty } from '@nestjs/swagger';
import { Token as PrismaToken } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Constants } from '../../common/constants';

export class Token {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  @IsNotEmpty()
  @Exclude()
  id: PrismaToken['id'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  userId: PrismaToken['userId'];

  @ApiProperty({ description: Constants.PROPERTY_TOKEN })
  @IsString()
  token: PrismaToken['token'];

  @ApiProperty({ description: Constants.PROPERTY_REFRESH_TOKEN })
  @IsString()
  refreshToken: PrismaToken['refreshToken'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_TOKEN })
  @IsString()
  emailToken: PrismaToken['emailToken'];

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD_TOKEN })
  @IsString()
  passwordToken: PrismaToken['passwordToken'];
}
