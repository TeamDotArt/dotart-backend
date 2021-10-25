import { ApiProperty } from '@nestjs/swagger';
import { BasicPallet as PrismaBasicPallet } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Constants } from 'src/common/constants';
export class BasicPallet {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  @IsNotEmpty()
  @Exclude()
  id: PrismaBasicPallet['id'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_ID })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  palletId: PrismaBasicPallet['palletId'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_NAME })
  @IsString()
  @IsNotEmpty()
  name: PrismaBasicPallet['name'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_DESCRIPTION })
  @IsString()
  @IsNotEmpty()
  description: PrismaBasicPallet['description'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_DATA })
  @IsString()
  @IsNotEmpty()
  data: PrismaBasicPallet['data'];

  //時間系
  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  @Exclude()
  createdAt: PrismaBasicPallet['createdAt'];
}
