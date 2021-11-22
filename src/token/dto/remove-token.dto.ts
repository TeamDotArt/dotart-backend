import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from 'src/common/constants';
import { ResponseBase } from 'src/common/dtoBase/response.dtoBase';
import { Token } from '../entities/token.entity';

export class RemoveTokenResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  userId: Token['userId'];
}
