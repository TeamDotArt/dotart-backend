import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Constants } from '../../common/constants';
import { User } from '../../users/entities/user.entity';

export class CreateUserRequest {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_USER_ID,
  })
  userId: User['userId'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL })
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_EMAIL,
  })
  @IsEmail()
  email: User['email'];

  @ApiProperty({ description: Constants.PROPERTY_PASSWORD })
  @IsNotEmpty()
  @MinLength(8, { message: Constants.MIN_LENGTH_PASSWORD })
  @IsString()
  password: User['password'];

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_NAME,
  })
  name: string;
}
