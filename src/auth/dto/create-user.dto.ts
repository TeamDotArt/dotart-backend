import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'userId' })
  @IsString()
  @IsNotEmpty({
    message: 'UserId is required',
  })
  userId: string;

  @ApiProperty({ description: 'email' })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  emailToken: string;

  @ApiProperty({ description: 'name' })
  @IsString()
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;
}
