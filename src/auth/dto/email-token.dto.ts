import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Constants } from '../../common/constants';

export class EmailTokenParam {
  @ApiProperty({ description: Constants.PROPERTY_EMAIL_TOKEN })
  @IsString()
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_EMAIL_TOKEN,
  })
  emailToken: string;
}
