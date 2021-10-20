import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
export class CreateUserPalletDto {
  @ApiProperty({ description: 'userId' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'data' })
  @IsString()
  data: string;

  @Exclude()
  createdAt: string;
}
