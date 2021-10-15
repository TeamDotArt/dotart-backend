import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 依存Modules
import { UsersModule } from './users/users.module';
import { UserpalletModule } from './userpallet/userpallet.module';
import { BasicPalletModule } from './basic-pallet/basic-pallet.module';
import { CanvasesModule } from './canvases/canvases.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    UsersModule,
    UserpalletModule,
    BasicPalletModule,
    CanvasesModule,
    AuthModule,
    ConfigModule.forRoot({
      // envファイルを組み込むために使用
      isGlobal: true,
    }),
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
