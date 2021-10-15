import { Test, TestingModule } from '@nestjs/testing';
import { CanvasesService } from './canvases.service';

describe('CanvasesService', () => {
  let service: CanvasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanvasesService],
    }).compile();

    service = module.get<CanvasesService>(CanvasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
