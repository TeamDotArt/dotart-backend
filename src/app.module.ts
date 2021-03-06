import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 依存Modules
import { UsersModule } from './users/users.module';
import { BasicPalletModule } from './basic-pallet/basic-pallet.module';
import { CanvasesModule } from './canvases/canvases.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { UserPalletModule } from './user-pallet/user-pallet.module';
import { LineBotModule } from './line-bot/line-bot.module';
import { ImageUploaderModule } from './image-uploader/image-uploader.module';

@Module({
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
    ImageUploaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
