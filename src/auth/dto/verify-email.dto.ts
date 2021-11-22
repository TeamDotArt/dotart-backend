import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from 'src/common/constants';
import { ResponseBase } from 'src/common/dtoBase/response.dtoBase';
import { User } from 'src/users/entities/user.entity';

export class VerifyEmailResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  userId: User['userId'];
}
