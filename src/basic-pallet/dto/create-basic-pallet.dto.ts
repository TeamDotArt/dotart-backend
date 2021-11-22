import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Constants } from 'src/common/constants';
import { BasicPallet } from 'src/basic-pallet/entities/basic-pallet.entity';
import { ResponseBase } from 'src/common/dtoBase/response.dtoBase';

export class CreateBasicPalletRequest {
  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_ID })
  @IsString()
  palletId: BasicPallet['palletId'];

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

export class CreateBasicPalletResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_ID })
  @IsString()
  palletId: BasicPallet['palletId'];
}
