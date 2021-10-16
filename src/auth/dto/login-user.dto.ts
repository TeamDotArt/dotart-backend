import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNumber, MinLength, IsNotEmpty } from 'class-validator';
import { Constants } from 'src/common/constants';

export class LogInUserRequest {
  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_USER_ID,
  })
  @IsString()
  userId: string;

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: string;
}

export class LogInUserResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  accessToken: string;
}
