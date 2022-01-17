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

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY0MDE1NzY2MSwiZXhwIjoxNjQwMTU4ODYxfQ.PJ0ejcXc3DU5r-19U2B5KRlyntyxBOVu5G_tcncMTNk';
  describe('正常系', () => {
    describe('findAll', () => {
      it('全ユーザ検索のテスト', async () => {
        try {
          await service.findAll();
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('findUserById', () => {
      it('ユーザを固有IDから検索のテスト', async () => {
        const id = 7;
        try {
          ('ユーザを固有IDから検索');
          await service.findUserById(id);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('findUserByEmailToken', () => {
      it('emailTokenから検索のテスト', async () => {
        const emailToken = '85233640';

        try {
          await service.findUserByEmailToken(emailToken);
        } catch (err) {
          expect(err).toBeInstanceOf(TypeError);
        }
      });
    });

    describe('findUserByPasswordToken', () => {
      it('passwordTokenからUserの検索のテスト', async () => {
        const passwordToken =
          'JDJiJDEwJE5HL1IxU21kNC5YbzdFTktWSnA4OU9SeFVWNHhWUm02R3RjUlBFeVpoSGprVG9vSTc3RG95';
        try {
          await service.findUserByPasswordToken(passwordToken);
        } catch (err) {
          expect(err).toBeInstanceOf(TypeError);
        }
      });
    });

    describe('getUserIdById', () => {
      it('ユーザ固有IDからユーザIDを検索のテスト', async () => {
        const id = 7;
        try {
          await service.getUserIdById(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUserIdByName', () => {
      it('ユーザ名からユーザIDを検索のテスト', async () => {
        const name = 'admin';
        try {
          await service.getUserIdByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUserProfileById', () => {
      it('ユーザ固有IDからプロフィール情報を検索のテスト', async () => {
        const id = 7;
        try {
          await service.getUserProfileById(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUserProfile', () => {
      it('ユーザIDからプロフィール情報を検索のテスト', async () => {
        const userId = 'test2';
        try {
          await service.getUserProfile(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('validateFindByUserId', () => {
      it('ユーザIDからユーザデータを取得(認証用)のテスト', async () => {
        const userId = 'test2';
        try {
          await service.validateFindByUserId(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザのProfileを更新のテスト', async () => {
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
          await service.updateProfile(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('remove', () => {
      it('ユーザの削除のテスト', async () => {
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
          await service.remove(req);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('異常系', () => {
    describe('findUserById', () => {
      it('ユーザを固有IDから検索のテスト(idがない場合)', async () => {
        const id = undefined;
        try {
          await service.findUserById(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findUserByEmailToken', () => {
      it('emailTokenから検索のテスト(emailTokenが未入力)', async () => {
        const emailToken = '';
        try {
          await service.findUserByEmailToken(emailToken);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findUserByPasswordToken', () => {
      it('passwordTokenからUserの検索のテスト（PasswordTokenが未入力）', async () => {
        const passwordToken = '';
        try {
          await service.findUserByPasswordToken(passwordToken);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUserIdById', () => {
      it('ユーザ固有IDからユーザIDを検索のテスト(固有IDが未入力)', async () => {
        const id = undefined;
        try {
          await service.getUserIdById(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUserIdByName', () => {
      it('ユーザ名からユーザIDを検索のテスト', async () => {
        const name = '';
        try {
          await service.getUserIdByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUserProfileById', () => {
      it('ユーザ固有IDからプロフィール情報を検索のテスト(idが未入力', async () => {
        const id = undefined;
        try {
          await service.getUserProfileById(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getUserProfile', () => {
      it('ユーザIDからプロフィール情報を検索のテスト(userIdが未入力)', async () => {
        const userId = '';
        try {
          await service.getUserProfile(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('validateFindByUserId', () => {
      it('ユーザIDからユーザデータを取得(認証用)(userIdが未入力)のテスト', async () => {
        const userId = '';
        try {
          await service.validateFindByUserId(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
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
        try {
          await service.updateProfile(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });

    describe('updateProfile', () => {
      it('ユーザのProfileを更新のテスト(mockが未入力)', async () => {
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
          userId: '',
          email: '',
          password: '',
          name: '',
        };
        try {
          await service.updateProfile(req, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
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
        try {
          await service.remove(req);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });
  });
});
