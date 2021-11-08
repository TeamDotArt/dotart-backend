import { ApiProperty } from '@nestjs/swagger';
import { UserPallet as PrismaUserPallet, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Constants } from '../../common/constants';

export class UserPallet {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  @IsNotEmpty()
  @Exclude()
  id: PrismaUserPallet['id'];

  @ApiProperty({ description: Constants.PROPERTY_USER_PALLET })
  @IsNumber()
  @IsNotEmpty()
  @Exclude()
  palletId: PrismaUserPallet['palletId'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  userId: PrismaUserPallet['userId'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_NAME })
  @IsString()
  name: PrismaUserPallet['name'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_DATA })
  @IsString()
  data: PrismaUserPallet['data'];

  //子要素系
  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  @IsOptional()
  user?: User[];

  //時間系
  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  @Exclude()
  createdAt: PrismaUserPallet['createdAt'];

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  @Exclude()
  updatedAt: PrismaUserPallet['updatedAt'];
}
