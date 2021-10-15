import { Test, TestingModule } from '@nestjs/testing';
import { CanvasesController } from './canvases.controller';
import { CanvasesService } from './canvases.service';

describe('CanvasesController', () => {
  let controller: CanvasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanvasesController],
      providers: [CanvasesService],
    }).compile();

    controller = module.get<CanvasesController>(CanvasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
