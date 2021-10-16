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

@Module({
  imports: [
    UsersModule,
    BasicPalletModule,
    CanvasesModule,
    AuthModule,
    ConfigModule.forRoot({
      // envファイルを組み込むために使用
      isGlobal: true,
    }),
    AuthModule,
    TokenModule,
    UserPalletModule,
    BasicPalletModule,
    CanvasesModule,
    UserPalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
