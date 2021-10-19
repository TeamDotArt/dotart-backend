import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Constants } from 'src/common/constants';
import { User } from 'src/users/entities/user.entity';

export class PayloadDto {
  @ApiProperty({ description: Constants.PROPERTY_ID })
  @IsNumber()
  id: User['id'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  userId: User['userId'];

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  name: User['name'];

  @ApiProperty({ description: Constants.PROPERTY_ROLE })
  role: User['role'];
}
