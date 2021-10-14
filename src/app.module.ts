import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserpalletModule } from './userpallet/userpallet.module';

@Module({
  imports: [UsersModule, UserpalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
