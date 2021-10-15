import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserpalletModule } from './userpallet/userpallet.module';
import { BasicPalletModule } from './basic-pallet/basic-pallet.module';
import { CanvasesModule } from './canvases/canvases.module';

@Module({
  imports: [UsersModule, UserpalletModule, BasicPalletModule, CanvasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
