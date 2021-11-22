import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from '../../common/constants';
import { Token } from '../entities/token.entity';

export class RefreshTokenResponse {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  refreshToken: Token['refreshToken'];
}
