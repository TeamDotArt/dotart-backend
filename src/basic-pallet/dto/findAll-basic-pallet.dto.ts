import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { Constants } from '../../common/constants';
import { BasicPallet } from '../../basic-pallet/entities/basic-pallet.entity';

export class FindAllBasicPalletResponse {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  @IsNotEmpty()
  id: BasicPallet['id'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_ID })
  @IsString()
  @IsNotEmpty()
  palletId: BasicPallet['palletId'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_NAME })
  @IsString()
  @IsNotEmpty()
  name: BasicPallet['name'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_DESCRIPTION })
  @IsString()
  @IsNotEmpty()
  description: BasicPallet['description'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_DATA })
  @IsString()
  @IsNotEmpty()
  data: BasicPallet['data'];

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  createdAt: BasicPallet['createdAt'];
}
