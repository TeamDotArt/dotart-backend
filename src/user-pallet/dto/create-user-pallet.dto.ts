import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Constants } from 'src/common/constants';
import { UserPallet } from '.prisma/client';

export class CreateUserPalletRequest {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_USER_ID,
  })
  userId: UserPallet['userId'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_NAME })
  @IsString()
  name: UserPallet['name'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_DATA })
  @IsString()
  data: UserPallet['data'];
}
