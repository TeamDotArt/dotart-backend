import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Constants } from '../../common/constants';

/**
 * レスポンスのベース
 * status -> ステータスコード
 * message -> ステータスメッセージ
 */
export class ResponseBase {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;
}
