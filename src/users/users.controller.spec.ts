import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
// Service
import { PrismaService } from '../common/prisma.service';
import { TokenService } from '../token/token.service';
import { UsersService } from './users.service';
// DTO
import { FindUserParam } from './dto/find-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { FastifyRequest } from 'fastify';
// Controller
import { UsersController } from './users.controller';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        { provide: 'TokenServiceInterface', useClass: TokenService },
        { provide: 'UsersServiceInterface', useClass: UsersService },
        UsersService,
      ],
    })
      .overrideGuard(UseGuards)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY0MDE1NzY2MSwiZXhwIjoxNjQwMTU4ODYxfQ.PJ0ejcXc3DU5r-19U2B5KRlyntyxBOVu5G_tcncMTNk';
  describe('正常系', () => {
    describe('getUsers', () => {
      it('全ユーザ検索のテスト', async () => {
        try {
          await controller.getUsers();
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('getUser', () => {
      it('userIdから単一ユーザ検索のテスト', async () => {
        const userId: FindUserParam = { userId: 'test2' };
        try {
          await controller.getUser(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザーデータ更新のテスト', async () => {
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
        const mock: UpdateUserRequest = {
          userId: 'test2',
          email: 'test2@gmail.com',
          password: 'test2222',
          name: 'test2',
        };
        try {
          await controller.updateProfile(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('deleteUser', () => {
      it('ユーザーデータ削除のテスト', async () => {
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
          await controller.deleteUser(req);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('異常系', () => {
    describe('getUsers', () => {
      it('全ユーザ検索（DBにない）', async () => {
        try {
          await controller.getUsers();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUser/:userId', () => {
      it('userIdによる単一取得のテスト（userId未入力）', async () => {
        const userId: FindUserParam = { userId: '' };
        try {
          await controller.getUser(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUser/:userId', () => {
      it('userIdによる単一取得のテスト（userIdが存在しない）', async () => {
        const userId: FindUserParam = { userId: 'testtest' };
        try {
          await controller.getUser(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザーデータ更新のテスト(emailが未入力)', async () => {
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
        const mock: UpdateUserRequest = {
          userId: 'test2',
          email: '',
          password: 'test2222',
          name: 'test2',
        };
        try {
          await controller.updateProfile(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });
    });

    it('ユーザーデータ更新のテスト(passが8文字未満)', async () => {
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
      const mock: UpdateUserRequest = {
        userId: 'test2',
        email: 'test2@gmail.com',
        password: 'test',
        name: 'test2',
      };
      try {
        await controller.updateProfile(req, mock);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });

    it('ユーザーデータ更新のテスト(reqが不正)', async () => {
      const req: FastifyRequest = {
        headers: {
          authorization: 'test123345',
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
      const mock: UpdateUserRequest = {
        userId: 'test2',
        email: 'test2@gmail.com',
        password: 'test',
        name: 'test2',
      };
      try {
        await controller.updateProfile(req, mock);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    describe('deleteUser', () => {
      it('ユーザーデータ削除のテスト(reqが不正)', async () => {
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
          await controller.deleteUser(req);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });
  });
});
