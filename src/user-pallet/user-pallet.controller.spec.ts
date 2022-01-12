import { Test, TestingModule } from '@nestjs/testing';
// Service
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { UserPalletService } from './user-pallet.service';
// Controller
import { UserPalletController } from './user-pallet.controller';
// Exception
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
// DTO
import { UpdateUserPalletRequest } from './dto/update-user-pallet.dto';
import { CreateUserPalletRequest } from './dto/create-user-pallet.dto';
import { RemoveUserPalletRequest } from './dto/delete-user-pallet.dto';
import { FastifyRequest } from 'fastify';

describe('UserPalletController', () => {
  let controller: UserPalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPalletController],
      providers: [
        {
          provide: 'UserPalletServiceInterface',
          useClass: UserPalletService,
        },
        { provide: 'UsersServiceInterface', useClass: UsersService },
        { provide: 'TokenServiceInterface', useClass: TokenService },
        PrismaService,
        UserPalletService,
      ],
    })
      .overrideGuard(UseGuards)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserPalletController>(UserPalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY0MDE1NzY2MSwiZXhwIjoxNjQwMTU4ODYxfQ.PJ0ejcXc3DU5r-19U2B5KRlyntyxBOVu5G_tcncMTNk';
  describe('正常系', () => {
    describe('createUserPallet', () => {
      it('ユーザパレット生成のテスト', async () => {
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
        const body: CreateUserPalletRequest = {
          palletId: 'mono1',
          userId: 'test2',
          name: 'マイパレット（モノトーン）',
          data: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(235, 235, 235)',
              'rgb(220, 220, 220)',
              'rgb(205, 205, 205)',
              'rgb(190, 190, 190)',
              'rgb(175, 175, 175)',
              'rgb(160, 160, 160)',
              'rgb(145, 145, 145)',
              'rgb(130, 130, 130)',
              'rgb(115, 115, 115)',
              'rgb(100, 100, 100)',
              'rgb(85, 85, 85)',
              'rgb(70, 70, 70)',
              'rgb(55, 55, 55)',
              'rgb(40, 40, 40)',
              'rgb(0, 0, 0)',
            ],
          },
        };
        let result;
        try {
          console.log('ユーザパレット生成');
          result = await controller.createUserPallet(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    describe('getUserPallets', () => {
      it('全ユーザパレット検索のテスト', async () => {
        let result;
        try {
          console.log('全ユーザパレット検索');
          result = await controller.getUserPallets();
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('getUserPallet', () => {
      it('palletIdから単一ユーザパレット検索のテスト', async () => {
        const palletId = 'mono1';
        let result;
        try {
          console.log('palletIdから単一ユーザパレット検索');
          result = await controller.getUserPallet(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getUserPalletByName', () => {
      it('nameから単一ユーザパレット検索のテスト', async () => {
        const name = 'マイパレット（モノトーン）';
        let result;
        try {
          console.log('nameから単一ユーザパレット検索');
          result = await controller.getUserPalletByName(name);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateUserPallet', () => {
      it('ユーザパレット更新のテスト', async () => {
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
        const data: UpdateUserPalletRequest = {
          name: 'マイパレット（モノトーン）更新',
          data: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(235, 235, 235)',
              'rgb(220, 220, 220)',
              'rgb(205, 205, 205)',
              'rgb(190, 190, 190)',
              'rgb(175, 175, 175)',
              'rgb(160, 160, 160)',
              'rgb(145, 145, 145)',
              'rgb(130, 130, 130)',
              'rgb(115, 115, 115)',
              'rgb(100, 100, 100)',
              'rgb(85, 85, 85)',
              'rgb(70, 70, 70)',
              'rgb(55, 55, 55)',
              'rgb(40, 40, 40)',
              'rgb(0, 0, 0)',
            ],
          },
        };
        let result;
        try {
          console.log('ユーザパレット更新のテスト');
          result = await controller.updateUserPallet(req, data);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('deleteUserPallet', () => {
      it('ユーザパレット削除のテスト', async () => {
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
        const body: RemoveUserPalletRequest = { palletId: 'mono1' };
        let result;
        try {
          console.log('ユーザパレット削除のテスト');
          result = await controller.deleteUserPallet(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });
  });

  describe('異常系', () => {
    describe('createUserPallet', () => {
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
        const body: CreateUserPalletRequest = {
          palletId: 'mono1',
          userId: 'test2',
          name: 'マイパレット（モノトーン）',
          data: [
            'rgb(255, 255, 255)',
            'rgb(235, 235, 235)',
            'rgb(220, 220, 220)',
            'rgb(205, 205, 205)',
            'rgb(190, 190, 190)',
            'rgb(175, 175, 175)',
            'rgb(160, 160, 160)',
            'rgb(145, 145, 145)',
            'rgb(130, 130, 130)',
            'rgb(115, 115, 115)',
            'rgb(100, 100, 100)',
            'rgb(85, 85, 85)',
            'rgb(70, 70, 70)',
            'rgb(55, 55, 55)',
            'rgb(40, 40, 40)',
            'rgb(0, 0, 0)',
          ],
        };
        let result;
        try {
          console.log('ユーザパレット生成(reqが不正)');
          result = await controller.createUserPallet(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
          console.log(err);
        }
      });

      it('ユーザパレット生成(palletIdが未入力)のテスト', async () => {
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
        const body: CreateUserPalletRequest = {
          palletId: '',
          userId: 'test2',
          name: 'マイパレット（モノトーン）',
          data: [
            'rgb(255, 255, 255)',
            'rgb(235, 235, 235)',
            'rgb(220, 220, 220)',
            'rgb(205, 205, 205)',
            'rgb(190, 190, 190)',
            'rgb(175, 175, 175)',
            'rgb(160, 160, 160)',
            'rgb(145, 145, 145)',
            'rgb(130, 130, 130)',
            'rgb(115, 115, 115)',
            'rgb(100, 100, 100)',
            'rgb(85, 85, 85)',
            'rgb(70, 70, 70)',
            'rgb(55, 55, 55)',
            'rgb(40, 40, 40)',
            'rgb(0, 0, 0)',
          ],
        };
        let result;
        try {
          console.log('ユーザパレット生成(palletIdが未入力)');
          result = await controller.createUserPallet(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    describe('createUserPallet', () => {
      it('ユーザパレット生成のテスト', async () => {
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
        const body: CreateUserPalletRequest = {
          palletId: 'mono1',
          userId: 'test2',
          name: 'マイパレット（モノトーン）',
          data: [
            'rgb(255, 255, 255)',
            'rgb(235, 235, 235)',
            'rgb(220, 220, 220)',
            'rgb(205, 205, 205)',
            'rgb(190, 190, 190)',
            'rgb(175, 175, 175)',
            'rgb(160, 160, 160)',
            'rgb(145, 145, 145)',
            'rgb(130, 130, 130)',
            'rgb(115, 115, 115)',
            'rgb(100, 100, 100)',
            'rgb(85, 85, 85)',
            'rgb(70, 70, 70)',
            'rgb(55, 55, 55)',
            'rgb(40, 40, 40)',
            'rgb(0, 0, 0)',
          ],
        };
        let result;
        try {
          console.log('ユーザパレット生成');
          result = await controller.createUserPallet(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });

      it('ユーザパレット生成(palletIdが重複)のテスト', async () => {
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
        const body: CreateUserPalletRequest = {
          palletId: 'mono1',
          userId: 'test2',
          name: 'マイパレット（モノトーン）',
          data: [
            'rgb(255, 255, 255)',
            'rgb(235, 235, 235)',
            'rgb(220, 220, 220)',
            'rgb(205, 205, 205)',
            'rgb(190, 190, 190)',
            'rgb(175, 175, 175)',
            'rgb(160, 160, 160)',
            'rgb(145, 145, 145)',
            'rgb(130, 130, 130)',
            'rgb(115, 115, 115)',
            'rgb(100, 100, 100)',
            'rgb(85, 85, 85)',
            'rgb(70, 70, 70)',
            'rgb(55, 55, 55)',
            'rgb(40, 40, 40)',
            'rgb(0, 0, 0)',
          ],
        };
        let result;
        try {
          console.log('ユーザパレット生成(palletIdが重複)');
          result = await controller.createUserPallet(req, body);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    describe('getUserPallet', () => {
      it('palletIdから単一ユーザパレット検索(palletIdが未入力)のテスト', async () => {
        const palletId = '';
        let result;
        try {
          console.log('palletIdから単一ユーザパレット検索(palletIdが未入力)');
          result = await controller.getUserPallet(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });

      it('palletIdから単一ユーザパレット検索(palletIdが存在しない)のテスト', async () => {
        const palletId = 'testtest';
        let result;
        try {
          console.log(
            'palletIdから単一ユーザパレット検索(palletIdが存在しない)',
          );
          result = await controller.getUserPallet(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getUserPalletByName', () => {
      it('nameから単一ユーザパレット検索のテスト(nameが未入力)', async () => {
        const name = '';
        let result;
        try {
          console.log('nameから単一ユーザパレット検索(nameが未入力)');
          result = await controller.getUserPalletByName(name);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });

      it('nameから単一ユーザパレット検索のテスト(nameが存在しない)', async () => {
        const name = 'testtest';
        let result;
        try {
          console.log('nameから単一ユーザパレット検索(nameが存在しない)');
          result = await controller.getUserPalletByName(name);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateUserPallet', () => {
      it('ユーザパレット更新(reqが不正)のテスト', async () => {
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
        const data: UpdateUserPalletRequest = {
          name: 'マイパレット（モノトーン）更新',
          data: {
            data: [
              'rgb(255, 255, 255)',
              'rgb(235, 235, 235)',
              'rgb(220, 220, 220)',
              'rgb(205, 205, 205)',
              'rgb(190, 190, 190)',
              'rgb(175, 175, 175)',
              'rgb(160, 160, 160)',
              'rgb(145, 145, 145)',
              'rgb(130, 130, 130)',
              'rgb(115, 115, 115)',
              'rgb(100, 100, 100)',
              'rgb(85, 85, 85)',
              'rgb(70, 70, 70)',
              'rgb(55, 55, 55)',
              'rgb(40, 40, 40)',
              'rgb(0, 0, 0)',
            ],
          },
        };
        let result;
        try {
          console.log('ユーザパレット更新のテスト(reqが不正)');
          result = await controller.updateUserPallet(req, data);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
          console.log(err);
        }
      });
    });

    it('ユーザパレット更新(nameが未入力)のテスト', async () => {
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
      const data: UpdateUserPalletRequest = {
        name: '',
        data: {
          data: [
            'rgb(255, 255, 255)',
            'rgb(235, 235, 235)',
            'rgb(220, 220, 220)',
            'rgb(205, 205, 205)',
            'rgb(190, 190, 190)',
            'rgb(175, 175, 175)',
            'rgb(160, 160, 160)',
            'rgb(145, 145, 145)',
            'rgb(130, 130, 130)',
            'rgb(115, 115, 115)',
            'rgb(100, 100, 100)',
            'rgb(85, 85, 85)',
            'rgb(70, 70, 70)',
            'rgb(55, 55, 55)',
            'rgb(40, 40, 40)',
            'rgb(0, 0, 0)',
          ],
        },
      };
      let result;
      try {
        console.log('ユーザパレット更新のテスト(nameが未入力)');
        result = await controller.updateUserPallet(req, data);
        console.log(result);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        console.log(err);
      }
    });
  });

  describe('deleteUserPallet', () => {
    it('ユーザパレット削除(reqが不正)のテスト', async () => {
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
      const body: RemoveUserPalletRequest = { palletId: 'mono1' };
      let result;
      try {
        console.log('ユーザパレット削除のテスト(reqが不正)');
        result = await controller.deleteUserPallet(req, body);
        console.log(result);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        console.log(err);
      }
    });

    it('ユーザパレット削除のテスト（bodyが未入力）', async () => {
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
      const body: RemoveUserPalletRequest = { palletId: '' };
      let result;
      try {
        console.log('ユーザパレット削除のテスト（bodyが未入力）');
        result = await controller.deleteUserPallet(req, body);
        console.log(result);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        console.log(err);
      }
    });

    it('ユーザパレット重複テスト用データの削除のテスト', async () => {
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
      const body: RemoveUserPalletRequest = { palletId: 'mono1' };
      let result;
      try {
        console.log('ユーザパレット重複テスト用データの削除のテスト');
        result = await controller.deleteUserPallet(req, body);
        console.log(result);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        console.log(err);
      }
    });
  });
});
