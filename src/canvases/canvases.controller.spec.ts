import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { CanvasesController } from './canvases.controller';
import { CanvasesService } from './canvases.service';
import { TokenService } from '../token/token.service';

describe('CanvasesController', () => {
  let controller: CanvasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanvasesController],
      providers: [CanvasesService, PrismaService, UsersService, TokenService],
    }).compile();

    controller = module.get<CanvasesController>(CanvasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
