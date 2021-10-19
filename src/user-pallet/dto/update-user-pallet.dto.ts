import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserPalletDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'data' })
  @IsString()
  data: string;
}
