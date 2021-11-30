import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { CanvasesService } from './canvases.service';
import { RoleGuard } from '../auth/guards/role.guard';

describe('CanvasesService', () => {
  let service: CanvasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CanvasesService,
        PrismaService,
        { provide: 'TokenServiceInterface', useClass: TokenService },
        { provide: 'UsersServiceInterface', useClass: UsersService },
      ],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    service = module.get<CanvasesService>(CanvasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
