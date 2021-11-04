import { ApiProperty } from '@nestjs/swagger';
import { Canvases as PrismaCanvas, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Constants } from 'src/common/constants';

export class Canvas {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  @IsNotEmpty()
  @Exclude()
  id: PrismaCanvas['id'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  canvasId: PrismaCanvas['canvasId'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  userId: PrismaCanvas['userId'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_NAME })
  @IsString()
  @IsNotEmpty()
  canvasName: PrismaCanvas['canvasName'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_RANGE })
  @IsNumber()
  @IsNotEmpty()
  canvasRange: PrismaCanvas['canvasRange'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET })
  @IsString()
  @IsNotEmpty()
  pallet: PrismaCanvas['pallet'];

  @ApiProperty({ description: Constants.PROPERTY_CANVASES_DATA })
  @IsString()
  @IsNotEmpty()
  canvasesData: PrismaCanvas['canvasesData'];

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  @IsOptional()
  user?: User[];

  //時間系
  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  @Exclude()
  createdAt: PrismaCanvas['createdAt'];

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  @Exclude()
  updatedAt: PrismaCanvas['updatedAt'];
}
