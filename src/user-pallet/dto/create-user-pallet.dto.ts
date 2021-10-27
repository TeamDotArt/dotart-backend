import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Constants } from 'src/common/constants';
import { UserPallet } from 'src/user-pallet/entities/user-pallet.entity';

export class CreateUserPalletRequest {
  @ApiProperty({ description: Constants.PROPERTY_USER_PALLET })
  @IsString()
  palletId: UserPallet['palletId'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  userId: UserPallet['userId'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_NAME })
  @IsString()
  name: UserPallet['name'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_DATA })
  @IsString()
  data: UserPallet['data'];
}

export class CreateUserPalletResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;

  @ApiProperty({ description: Constants.PROPERTY_USER_PALLET })
  @IsString()
  palletId: UserPallet['palletId'];
}
