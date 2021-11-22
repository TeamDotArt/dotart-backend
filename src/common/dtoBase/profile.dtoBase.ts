import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Constants } from '../../common/constants';
import { User } from '../../users/entities/user.entity';

/**
 * プロフィール情報のベース
 * userId -> ユーザの任意ID
 * email -> メールアドレス
 * name -> 名前
 * emailVerified -> メールアドレスが確認済みかどうか
 * createdAt -> 作成日時
 * confirmedAt -> メールアドレス確認日時
 */
export class ProfileBase {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsNotEmpty()
  @IsString()
  userId: User['userId'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL })
  @IsNotEmpty({
    message: Constants.IS_NOT_EMPTY_EMAIL,
  })
  @IsEmail()
  email: User['email'];

  @ApiProperty({ description: Constants.PROPERTY_NAME })
  @IsString()
  name: User['name'];

  @ApiProperty({ description: Constants.PROPERTY_EMAIL_VERIFIED })
  @IsBoolean()
  emailVerified: User['emailVerified'];

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  createdAt: User['createdAt'];

  @ApiProperty({ description: Constants.PROPERTY_CONFIRMED_AT })
  @IsDate()
  confirmedAt: User['confirmedAt'];
}
