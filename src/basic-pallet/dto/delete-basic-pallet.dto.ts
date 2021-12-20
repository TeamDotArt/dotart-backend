import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Constants } from '../../common/constants';
import { BasicPallet } from '../../basic-pallet/entities/basic-pallet.entity';
import { ResponseBase } from '../../common/dtoBase/response.dtoBase';

export class RemoveBasicPalletResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_ID })
  @IsString()
  @IsNotEmpty()
  palletId: BasicPallet['palletId'];
}
