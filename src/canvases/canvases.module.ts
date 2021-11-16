import { Module } from '@nestjs/common';
import { CanvasesService } from './canvases.service';
import { CanvasesController } from './canvases.controller';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [CanvasesController],
  providers: [
    {
      provide: 'CanvasesServiceInterface',
      useClass: CanvasesService,
    },
    { provide: 'TokenServiceInterface', useClass: TokenService },
    PrismaService,
    UsersService,
  ],
})
export class CanvasesModule {}
