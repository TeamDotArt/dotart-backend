import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Constants } from 'src/common/constants';

export class PayloadDto {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  id: number;

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  userId: string;

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  name: string;

  @ApiProperty({ description: Constants.PROPERTY_ROLE })
  role: Role;
}
