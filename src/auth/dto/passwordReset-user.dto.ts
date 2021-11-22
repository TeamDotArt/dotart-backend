import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Constants } from '../../common/constants';
import { ResponseBase } from '../../common/dtoBase/response.dtoBase';
import { User } from '../../users/entities/user.entity';

export class PasswordResetParam {
  @ApiProperty({ description: Constants.PROPERTY_PASSWORD_TOKEN })
  @IsString()
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_PASSWORD_TOKEN,
  })
  passwordToken: string;
}

export class PasswordResetReqResponse extends ResponseBase {}

export class PasswordResetRequest {
  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: User['password'];
}

export class PasswordResetResponse extends ResponseBase {}
