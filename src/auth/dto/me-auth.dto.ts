import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Constants } from 'src/common/constants';
import { ProfileBase } from 'src/common/dtoBase/profile.dtoBase';

export class MeResponse extends ProfileBase {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;
}
