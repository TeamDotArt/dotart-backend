import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { Constants } from 'src/common/constants';
import { UserPallet } from 'src/user-pallet/entities/user-pallet.entity';

export class FindAllUserPalletResponse {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  id: UserPallet['id'];

  @ApiProperty({ description: Constants.PROPERTY_USER_PALLET })
  @IsNotEmpty()
  palletId: UserPallet['palletId'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsNotEmpty()
  @IsString()
  userId: UserPallet['userId'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_NAME })
  @IsString()
  name: UserPallet['name'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET_DATA })
  @IsString()
  data: UserPallet['data'];

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  createdAt: UserPallet['createdAt'];

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  updatedAt: UserPallet['updatedAt'];
}
