import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from '../../common/constants';
import { ResponseBase } from '../../common/dtoBase/response.dtoBase';
import { Token } from '../entities/token.entity';

export class RemoveTokenResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  userId: Token['userId'];
}
