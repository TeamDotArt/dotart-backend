import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from 'src/common/constants';
import { ResponseBase } from 'src/common/dtoBase/response.dtoBase';
import { BasicPallet } from '../entities/basic-pallet.entity';

export class UpdateBasicPalletRequest {
  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_NAME })
  @IsString()
  name: BasicPallet['name'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_DESCRIPTION })
  @IsString()
  description: BasicPallet['description'];

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_DATA })
  @IsString()
  data: BasicPallet['data'];
}

export class UpdateBasicPalletResponse extends ResponseBase {}
