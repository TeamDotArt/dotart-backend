import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Constants } from 'src/common/constants';
import { User } from 'src/users/entities/user.entity';

export class PasswordResetReqResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;
}

export class PasswordResetRequest {
  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: User['password'];
}

export class PasswordResetResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;
}
