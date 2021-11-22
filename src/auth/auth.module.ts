import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { TokenService } from '../token/token.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // JWTを使うための設定をしている
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          // envファイルから秘密鍵を渡す
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            // 有効期間を設定
            // 指定する値は以下を参照
            // https://github.com/vercel/ms
            expiresIn: '1200s',
          },
        };
      },
      inject: [ConfigService], // useFactoryで使う為にConfigServiceを注入する
    }),
  ],
  // controllers: [AuthController],
  providers: [
    { provide: 'AuthServiceInterface', useClass: AuthService },
    { provide: 'TokenServiceInterface', useClass: TokenService },
    { provide: 'UsersServiceInterface', useClass: UsersService },
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [{ provide: 'AuthServiceInterface', useClass: AuthService }],
})
export class AuthModule {}
