import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import {
  // ForbiddenException,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
// import { plainToClass } from 'class-transformer';
import { User } from '@prisma/client';

interface JWTPayload {
  id: User['id'];
  userId: User['userId'];
  name: User['name'];
  role: User['role'];
}

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // envファイルから秘密鍵を渡す
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  // ここでPayloadを使ったバリデーション処理を実行できる
  // Payloadは、AuthService.login()で定義した値
  async validate(payload: JWTPayload): Promise<JWTPayload> {
    const payloadObj = {
      id: payload.id,
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    // const user = await this.authService.validateAccount(payloadObj.id);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // if (!user.active) {
    //   throw new ForbiddenException('Log in first');
    // }
    // return plainToClass(PayloadDto, payloadObj);
    return payloadObj;
  }
}
