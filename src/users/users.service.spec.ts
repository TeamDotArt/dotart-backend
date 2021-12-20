import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/prisma.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { TokenService } from '../token/token.service';
import { UsersService } from './users.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UpdateUserRequest } from './dto/update-user.dto';
import { FastifyRequest } from 'fastify';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        PrismaService,
        { provide: 'TokenServiceInterface', useClass: TokenService },
        { provide: 'UsersServiceInterface', useClass: UsersService },
      ],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();
    service = module.get<UsersService>(UsersService);
  });

  it('サービスがUndefinedではないか', () => {
    expect(service).toBeDefined();
  });

  describe('正常系', () => {
    describe('findAll', () => {
      it('全ユーザ検索のテスト', async () => {
        let result;
        try {
          result = await service.findAll();
          console.log('全ユーザ検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findUserById', () => {
      it('ユーザを固有IDから検索のテスト', async () => {
        const id = 7;
        let result;
        try {
          result = await service.findUserById(id);
          console.log('ユーザを固有IDから検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findUserByEmailToken', () => {
      it('emailTokenから検索のテスト', async () => {
        const emailToken = '85233640';
        let result;
        try {
          result = await service.findUserByEmailToken(emailToken);
          console.log('emailTokenから検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findUserByPasswordToken', () => {
      it('passwordTokenからUserの検索のテスト', async () => {
        const passwordToken =
          'JDJiJDEwJE5HL1IxU21kNC5YbzdFTktWSnA4OU9SeFVWNHhWUm02R3RjUlBFeVpoSGprVG9vSTc3RG95';
        let result;
        try {
          result = await service.findUserByPasswordToken(passwordToken);
          console.log('passwordTokenからUserの検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('getUserIdById', () => {
      it('ユーザ固有IDからユーザIDを検索のテスト', async () => {
        const id = 7;
        let result;
        try {
          result = await service.getUserIdById(id);
          console.log('ユーザ固有IDからユーザIDを検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('getUserIdByName', () => {
      it('ユーザ名からユーザIDを検索のテスト', async () => {
        const name = 'admin';
        let result;
        try {
          result = await service.getUserIdByName(name);
          console.log('ユーザ名からユーザIDを検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('getUserProfileById', () => {
      it('ユーザ固有IDからプロフィール情報を検索のテスト', async () => {
        const id = 7;
        let result;
        try {
          result = await service.getUserProfileById(id);
          console.log('ユーザ固有IDからプロフィール情報を検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('getUserProfile', () => {
      it('ユーザIDからプロフィール情報を検索のテスト', async () => {
        const userId = 'test2';
        let result;
        try {
          result = await service.getUserProfile(userId);
          console.log('ユーザIDからプロフィール情報を検索');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('validateFindByUserId', () => {
      it('ユーザIDからユーザデータを取得(認証用)のテスト', async () => {
        const userId = 'test2';
        let result;
        try {
          result = await service.validateFindByUserId(userId);
          console.log('ユーザIDからユーザデータを取得(認証用)');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザのProfileを更新のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0NDg3OSwiZXhwIjoxNjM4OTQ2MDc5fQ.G6lgc2JLXSwG2cfCHsUQibGobq13_lFvVhRoWEUdySA',
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
          result = await service.updateProfile(req, mock);
          console.log('ユーザのProfileを更新');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('remove', () => {
      it('ユーザの削除のテスト', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzODk0NDg3OSwiZXhwIjoxNjM4OTQ2MDc5fQ.G6lgc2JLXSwG2cfCHsUQibGobq13_lFvVhRoWEUdySA',
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
          result = await service.remove(req);
          console.log('ユーザの削除');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });
  });

  describe('異常系', () => {
    describe('findUserById', () => {
      it('ユーザを固有IDから検索のテスト(idがない場合)', async () => {
        const id = undefined;
        let result;
        try {
          console.log('ユーザを固有IDから検索(idがない場合)');
          result = await service.findUserById(id);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findUserByEmailToken', () => {
      it('emailTokenから検索のテスト(emailTokenが未入力)', async () => {
        const emailToken = '';
        let result;
        try {
          console.log('emailTokenから検索(emailTokenが未入力)');
          result = await service.findUserByEmailToken(emailToken);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findUserByPasswordToken', () => {
      it('passwordTokenからUserの検索のテスト（PasswordTokenが未入力）', async () => {
        const passwordToken = '';
        let result;
        try {
          console.log('passwordTokenからUserの検索（PasswordTokenが未入力）');
          result = await service.findUserByPasswordToken(passwordToken);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getUserIdById', () => {
      it('ユーザ固有IDからユーザIDを検索のテスト(固有IDが未入力)', async () => {
        const id = undefined;
        let result;
        try {
          console.log('ユーザ固有IDからユーザIDを検索(固有IDが未入力)');
          result = await service.getUserIdById(id);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getUserIdByName', () => {
      it('ユーザ名からユーザIDを検索のテスト', async () => {
        const name = '';
        let result;
        try {
          console.log('ユーザ名からユーザIDを検索(nameが未入力)');
          result = await service.getUserIdByName(name);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getUserProfileById', () => {
      it('ユーザ固有IDからプロフィール情報を検索のテスト(idが未入力', async () => {
        const id = undefined;
        let result;
        try {
          console.log('ユーザ固有IDからプロフィール情報を検索(idが未入力)');
          result = await service.getUserProfileById(id);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getUserProfile', () => {
      it('ユーザIDからプロフィール情報を検索のテスト(userIdが未入力)', async () => {
        const userId = '';
        let result;
        try {
          console.log('ユーザIDからプロフィール情報を検索(userIdが未入力)');
          result = await service.getUserProfile(userId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('validateFindByUserId', () => {
      it('ユーザIDからユーザデータを取得(認証用)(userIdが未入力)のテスト', async () => {
        const userId = '';
        let result;
        try {
          console.log('ユーザIDからユーザデータを取得(認証用)(userIdが未入力)');
          result = await service.validateFindByUserId(userId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザのProfileを更新のテスト(reqが不正)', async () => {
        const req: FastifyRequest = {
          headers: {
            authorization: 'tes12345',
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
          console.log('ユーザのProfileを更新(reqが不正)');
          result = await service.updateProfile(req, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザのProfileを更新のテスト(mockが未入力)', async () => {
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
          userId: '',
          email: '',
          password: '',
          name: '',
        };
        let result;
        try {
          console.log('ユーザのProfileを更新(mockが未入力)');
          result = await service.updateProfile(req, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });

    describe('remove', () => {
      it('ユーザの削除のテスト(reqが不正)', async () => {
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
          console.log('ユーザの削除(reqが未入力)');
          result = await service.remove(req);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          console.log(err);
        }
      });
    });
  });
});
