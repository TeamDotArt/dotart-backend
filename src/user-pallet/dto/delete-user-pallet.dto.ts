import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from 'src/common/constants';
import { ResponseBase } from 'src/common/dtoBase/response.dtoBase';
import { UserPallet } from '../entities/user-pallet.entity';

export class RemoveUserPalletResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  palletId: UserPallet['palletId'];
}
