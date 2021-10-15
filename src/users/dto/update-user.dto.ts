import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'userId' })
  @IsString()
  @IsOptional()
  userId: string;

  @ApiProperty({ description: 'email' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ description: 'name' })
  @IsString()
  @IsOptional()
  name: string;
}
