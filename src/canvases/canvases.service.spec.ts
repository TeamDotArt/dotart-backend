import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { CanvasesService } from './canvases.service';
import { TokenService } from '../token/token.service';

describe('CanvasesService', () => {
  let service: CanvasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanvasesService, PrismaService, UsersService, TokenService],
    }).compile();

    service = module.get<CanvasesService>(CanvasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
