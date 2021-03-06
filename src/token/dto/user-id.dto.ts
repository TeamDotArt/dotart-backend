import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from '../../common/constants';
import { Token } from '../entities/token.entity';

export class UserIdResponse {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  userId: Token['userId'];
}
