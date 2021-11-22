import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from 'src/common/constants';
import { ResponseBase } from 'src/common/dtoBase/response.dtoBase';
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

export class CreateUserPalletResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_USER_PALLET })
  @IsString()
  palletId: UserPallet['palletId'];
}
