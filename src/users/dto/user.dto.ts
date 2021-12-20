import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

export class UserDto {
  userId: string;
  name: string;
  role: number;
  @IsEmail({}, { message: 'メールアドレスが不正な形式です。' })
  readonly email: string;

  @MinLength(8, { message: 'パスワードは8文字以上にしてください。' })
  readonly password: string;

  @Exclude()
  emailVerified: boolean;
  isLoggedIn: boolean;
  @Exclude()
  createdAt: string;
  @Exclude()
  confirmedAt: string;
}
