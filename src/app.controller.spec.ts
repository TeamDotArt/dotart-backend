import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BasicPalletModule } from './basic-pallet/basic-pallet.module';
import { CanvasesModule } from './canvases/canvases.module';
import { LineBotModule } from './line-bot/line-bot.module';
import { TokenModule } from './token/token.module';
import { UserPalletModule } from './user-pallet/user-pallet.module';
import { UsersModule } from './users/users.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        BasicPalletModule,
        CanvasesModule,
        ConfigModule.forRoot({
          // envファイルを組み込むために使用
          isGlobal: true,
        }),
        LineBotModule,
        TokenModule,
        UsersModule,
        UserPalletModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello DotArtAPI!"', () => {
      expect(appController.getHello()).toBe('Hello DotArtAPI!');
    });
  });
});
