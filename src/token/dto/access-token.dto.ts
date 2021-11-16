import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from 'src/common/constants';
import { Token } from '../entities/token.entity';

export class AccessTokenResponse {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  token: Token['token'];
}
