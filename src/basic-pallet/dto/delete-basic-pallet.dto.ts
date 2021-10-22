import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { Constants } from 'src/common/constants';
import { BasicPallet } from 'src/basic-pallet/entities/basic-pallet.entity';

export class RemoveBasicPalletResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;

  @ApiProperty({ description: Constants.PROPERTY_BASIC_PALLET_ID })
  @IsNumber()
  @IsNotEmpty()
  palletId: BasicPallet['palletId'];
}
