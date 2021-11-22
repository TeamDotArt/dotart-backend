import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import {
  Inject,
  // ForbiddenException,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
// import { plainToClass } from 'class-transformer';
import { PayloadDto } from '../dto/payload.dto';
import { AuthServiceInterface } from '../interface/auth.service.interface';

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
    private readonly configService: ConfigService,
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
  async validate(payload: PayloadDto): Promise<PayloadDto> {
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
    // if (!user.isLoggedIn) {
    //   throw new ForbiddenException('Log in first');
    // }
    // return plainToClass(PayloadDto, payloadObj);
    return payloadObj;
  }
}
