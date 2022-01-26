import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { CanvasesService } from './canvases.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { FastifyRequest } from 'fastify';
import { CreateCanvasRequest } from './dto/create-canvas.dto';
import { UpdateCanvasRequest } from './dto/update-canvas.dto';
import { RemoveCanvasRequest } from './dto/delete-canvas.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY0MDE1NzY2MSwiZXhwIjoxNjQwMTU4ODYxfQ.PJ0ejcXc3DU5r-19U2B5KRlyntyxBOVu5G_tcncMTNk';
  describe('正常系', () => {
    describe('create', () => {
      it('キャンバス生成のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '1',
          canvasName: 'サンプル作品',
          canvasRange: 16,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findAll', () => {
      it('全キャンバス検索のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        try {
          await service.findAll(req);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findCanvasId', () => {
      it('canvasIdから単一キャンバス検索のテスト', async () => {
        const canvasId = '1';
        try {
          await service.findCanvasId(canvasId);
        } catch (err) {
          expect(err).toBeInstanceOf(TypeError);
        }
      });
    });

    describe('findCanvasByName', () => {
      it('canvasNameから単一キャンバス検索のテスト', async () => {
        const canvasName = 'サンプル作品';
        try {
          await service.findCanvasByName(canvasName);
        } catch (err) {
          expect(err).toBeInstanceOf(TypeError);
        }
      });
    });

    describe('update', () => {
      it('キャンバス更新のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const mock: UpdateCanvasRequest = {
          canvasId: '1',
          canvasName: 'サンプル作品(更新)',
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.update(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('remove', () => {
      it('キャンバス削除のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: RemoveCanvasRequest = { canvasId: '1' };
        try {
          await service.remove(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('異常系', () => {
    describe('create', () => {
      it('キャンバス生成(reqが不正)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: 'test12345',
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '1',
          canvasName: 'サンプル作品',
          canvasRange: 16,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });

      it('キャンバス生成(canvasIdが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '',
          userId: '1',
          canvasName: 'サンプル作品',
          canvasRange: 16,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      it('キャンバス生成(userIdが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '',
          canvasName: 'サンプル作品',
          canvasRange: 16,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };

        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      it('キャンバス生成(canvasNameが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '1',
          canvasName: '',
          canvasRange: 16,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      it('キャンバス生成(canvasRangeが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '1',
          canvasName: 'サンプル作品',
          canvasRange: undefined,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      it('キャンバス生成(palletが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '1',
          canvasName: 'サンプル作品',
          canvasRange: 16,
          pallet: undefined,
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      it('キャンバス生成(canvasesDataが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '1',
          canvasName: 'サンプル作品',
          canvasRange: 16,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: undefined,
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });
    });

    describe('create', () => {
      it('キャンバス生成のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '1',
          canvasName: 'サンプル作品',
          canvasRange: 16,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });

      it('キャンバス生成のテスト(bodyが重複)', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: CreateCanvasRequest = {
          canvasId: '1',
          userId: '1',
          canvasName: 'サンプル作品',
          canvasRange: 16,
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });
    });

    describe('findAll', () => {
      it('全キャンバス検索のテスト(reqが不正)', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: 'test12345',
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        try {
          await service.findAll(req);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });

    describe('findCanvasId', () => {
      it('canvasIdから単一キャンバス検索(canvasIdが未入力)のテスト', async () => {
        const canvasId = '';
        try {
          await service.findCanvasId(canvasId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findCanvasByName', () => {
      it('canvasNameから単一キャンバス検索(canvasNameが未入力)のテスト', async () => {
        const canvasName = '';
        try {
          await service.findCanvasByName(canvasName);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('update', () => {
      it('キャンバス更新(reqが不正)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: 'test12345',
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const mock: UpdateCanvasRequest = {
          canvasId: '1',
          canvasName: 'サンプル作品(更新)',
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.update(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });

      it('キャンバス更新(canvasIdが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const mock: UpdateCanvasRequest = {
          canvasId: '',
          canvasName: 'サンプル作品(更新)',
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.update(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      it('キャンバス更新(canvasNameが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const mock: UpdateCanvasRequest = {
          canvasId: '1',
          canvasName: '',
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.update(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      it('キャンバス更新(palletが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const mock: UpdateCanvasRequest = {
          canvasId: '1',
          canvasName: 'サンプル作品(更新)',
          pallet: undefined,
          canvasesData: {
            data: [
              {
                layerName: 'レイヤー1',
                layerIndex: '0',
                active: 'true',
                canvasIndexData:
                  '[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, ] ',
              },
            ],
          },
        };
        try {
          await service.update(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      it('キャンバス更新(canvasesDataが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const mock: UpdateCanvasRequest = {
          canvasId: '1',
          canvasName: 'サンプル作品(更新)',
          pallet: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(125, 125, 125)',
              'rgb(0, 0, 0)',
              'rgb(108, 57, 0)',
              'rgb(243, 55, 55)',
              'rgb(212, 110, 229)',
              'rgb(180, 27, 235)',
              'rgb(189, 137, 207)',
              'rgb(150, 150, 215)',
              'rgb(90, 90, 180)',
              'rgb(82, 226, 226)',
              'rgb(137, 255, 146)',
              'rgb(199, 243, 118)',
              'rgb(255, 245, 70)',
              'rgb(255, 195, 100)',
              'rgb(255, 228, 175)',
            ],
          },
          canvasesData: undefined,
        };
        try {
          await service.update(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });
    });

    describe('remove', () => {
      it('キャンバス削除(reqが不正)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: 'test12345',
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: RemoveCanvasRequest = { canvasId: '1' };
        try {
          await service.remove(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });

      it('キャンバス削除(bodyが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: RemoveCanvasRequest = { canvasId: '' };
        try {
          await service.remove(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });

      it('キャンバス重複テスト用データの削除のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: token,
          },
          id: undefined,
          params: undefined,
          raw: undefined,
          query: undefined,
          log: undefined,
          server: undefined,
          body: undefined,
          req: undefined,
          ip: '',
          hostname: '',
          url: '',
          protocol: 'http',
          method: '',
          routerPath: '',
          routerMethod: '',
          is404: false,
          socket: undefined,
          connection: undefined,
        };
        const body: RemoveCanvasRequest = { canvasId: '1' };
        try {
          await service.remove(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
