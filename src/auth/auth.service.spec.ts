import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // JWTを使うための設定をしている
        JwtModule.registerAsync({
          // ここでimportしないとconfigServiceが参照できない
          imports: [ConfigModule],
          useFactory: async () => {
            return {
              secret: process.env.JWT_SECRET_KEY,
              signOptions: {
                expiresIn: '1200s',
              },
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [
        AuthService,
        { provide: 'AuthServiceInterface', useClass: AuthService },
        { provide: 'TokenServiceInterface', useClass: TokenService },
        { provide: 'UsersServiceInterface', useClass: UsersService },
        PrismaService,
        LocalStrategy,
        JwtStrategy,
        ConfigService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
