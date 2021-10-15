import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BasicPalletModule } from './basic-pallet/basic-pallet.module';
import { CanvasesModule } from './canvases/canvases.module';
import { UserPalletModule } from './user-pallet/user-pallet.module';

@Module({
  imports: [
    UsersModule,
    UserPalletModule,
    BasicPalletModule,
    CanvasesModule,
    UserPalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
