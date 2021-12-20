import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { CanvasesService } from './canvases.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
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

  describe('正常系', () => {
    describe('create', () => {
      it('ユーザパレット生成のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          result = await service.create(req, body);
          console.log('ユーザパレット生成');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    describe('findAll', () => {
      it('全キャンバス検索のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          result = await service.findAll(req);
          console.log('全キャンバス検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findCanvasId', () => {
      it('canvasIdから単一キャンバス検索のテスト', async () => {
        const canvasId = '1';
        let result;
        try {
          result = await service.findCanvasId(canvasId);
          console.log('canvasIdから単一キャンバス検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('gfindCanvasByName', () => {
      it('canvasIdから単一キャンバス検索のテスト', async () => {
        const canvasName = 'サンプル作品';
        let result;
        try {
          result = await service.findCanvasByName(canvasName);
          console.log('canvasIdから単一キャンバス検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('update', () => {
      it('キャンバス更新のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          result = await service.update(req, mock);
          console.log('キャンバス更新のテスト');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('remove', () => {
      it('deleteCanvas削除のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          result = await service.remove(req, body);
          console.log('キャンバス削除のテスト');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });
  });

  describe('異常系', () => {
    describe('create', () => {
      it('ユーザパレット生成(reqが不正)のテスト', async () => {
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
        let result;
        try {
          console.log('ユーザパレット生成(reqが不正)');
          result = await service.create(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('ユーザパレット生成(canvasIdが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('ユーザパレット生成(canvasIdが未入力)');
          result = await service.create(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('ユーザパレット生成(userIdが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('ユーザパレット生成(userIdが未入力)');
          result = await service.create(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('ユーザパレット生成(canvasNameが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('ユーザパレット生成(canvasNameが未入力)');
          result = await service.create(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('ユーザパレット生成(canvasRangeが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('ユーザパレット生成(canvasRangeが未入力)');
          result = await service.create(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('ユーザパレット生成(palletが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('ユーザパレット生成(palletが未入力)');
          result = await service.create(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('ユーザパレット生成(canvasesDataが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('ユーザパレット生成(canvasesDataが未入力)');
          result = await service.create(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
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
        let result;
        try {
          console.log('全キャンバス検索(reqが不正)');
          result = await service.findAll(req);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    describe('findCanvasId', () => {
      it('canvasIdから単一キャンバス検索(canvasIdが未入力)のテスト', async () => {
        const canvasId = '';
        let result;
        try {
          console.log('canvasIdから単一キャンバス検索(canvasIdが未入力)');
          result = await service.findCanvasId(canvasId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findCanvasByName', () => {
      it('canvasIdから単一キャンバス検索(canvasNameが未入力)のテスト', async () => {
        const canvasName = '';
        let result;
        try {
          console.log('canvasIdから単一キャンバス検索(canvasNameが未入力)');
          result = await service.findCanvasByName(canvasName);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
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
        let result;
        try {
          console.log('キャンバス更新のテスト(reqが不正)');
          result = await service.update(req, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('キャンバス更新(canvasIdが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('キャンバス更新のテスト(canvasIdが未入力)');
          result = await service.update(req, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('キャンバス更新(canvasNameが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('キャンバス更新のテスト(canvasNameが未入力)');
          result = await service.update(req, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('キャンバス更新(palletが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('キャンバス更新のテスト(palletが未入力)');
          result = await service.update(req, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('キャンバス更新(canvasesDataが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('キャンバス更新のテスト(canvasesDataが未入力)');
          result = await service.update(req, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    describe('remove', () => {
      it('deleteCanvas削除(reqが不正)のテスト', async () => {
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
        let result;
        try {
          console.log('キャンバス削除のテスト(reqが不正)');
          result = await service.remove(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('deleteCanvas削除(bodyが未入力)のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0Njc4MSwiZXhwIjoxNjM4OTQ3OTgxfQ.i9bRym8TFoBWc73bIjTWouKow2mDwwx7a1K4-xrBzB8',
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
        let result;
        try {
          console.log('キャンバス削除のテスト(bodyが未入力)');
          result = await service.remove(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });
  });
});
