import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { Constants } from 'src/common/constants';
import { UserPallet } from 'src/user-pallet/entities/user-pallet.entity';

export class FindUserPalletResponse {
  @ApiProperty({ description: Constants.PROPERTY_USER_PALLET })
  @IsNotEmpty()
  @IsNumber()
  palletId: UserPallet['palletId'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_NAME })
  @IsString()
  name: UserPallet['name'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_DATA })
  @IsString()
  data: UserPallet['data'];

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  createdAt: UserPallet['createdAt'];
}
