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

  describe('正常系', () => {
    describe('getUsers', () => {
      it('全ユーザ検索のテスト', async () => {
        let result;
        try {
          result = await controller.getUsers();
          console.log('全ユーザ検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('getUser', () => {
      it('userIdから単一ユーザ検索のテスト', async () => {
        const userId: FindUserParam = { userId: 'test2' };
        let result;
        try {
          result = await controller.getUser(userId);
          console.log('userIdから単一ユーザ検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザーデータ更新のテスト', async () => {
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
        const mock: UpdateUserRequest = {
          userId: 'test2',
          email: 'test2@gmail.com',
          password: 'test2222',
          name: 'test2',
        };
        let result;
        try {
          result = await controller.updateProfile(req, mock);
          console.log('ユーザーデータ更新のテスト');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('deleteUser', () => {
      it('ユーザーデータ削除のテスト', async () => {
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
          result = await controller.deleteUser(req);
          console.log('ユーザーデータ削除のテスト');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });
  });

  describe('異常系', () => {
    describe('getUsers', () => {
      it('全ユーザ検索（DBにない）', async () => {
        let result;
        try {
          result = await controller.getUsers();
          console.log('全ユーザ検索（DBにない）');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getUser/:userId', () => {
      it('userIdによる単一取得のテスト（userId未入力）', async () => {
        const userId: FindUserParam = { userId: '' };
        let result;
        try {
          result = await controller.getUser(userId);
          console.log('userIdによる単一取得のテスト（userId未入力）');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getUser/:userId', () => {
      it('userIdによる単一取得のテスト（userIdが存在しない）', async () => {
        const userId: FindUserParam = { userId: 'testtest' };
        let result;
        try {
          result = await controller.getUser(userId);
          console.log('userIdによる単一取得のテスト（userIdが存在しない）');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザーデータ更新のテスト(emailが未入力)', async () => {
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
        const mock: UpdateUserRequest = {
          userId: 'test2',
          email: '',
          password: 'test2222',
          name: 'test2',
        };
        let result;
        try {
          result = await controller.updateProfile(req, mock);
          console.log('ユーザーデータ更新のテスト(emailが未入力)');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    it('ユーザーデータ更新のテスト(passが8文字未満)', async () => {
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
      const mock: UpdateUserRequest = {
        userId: 'test2',
        email: 'test2@gmail.com',
        password: 'test',
        name: 'test2',
      };
      let result;
      try {
        result = await controller.updateProfile(req, mock);
        console.log('ユーザーデータ更新のテスト(passが8文字未満)');
        console.log(result);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        console.log(err);
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
      let result;
      try {
        console.log('ユーザーデータ更新のテスト(reqが不正)');
        result = await controller.updateProfile(req, mock);

        console.log(result);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        console.log(err);
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
        let result;
        try {
          console.log('ユーザーデータ削除のテスト(reqが不正)');
          result = await controller.deleteUser(req);

          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });
  });
});
