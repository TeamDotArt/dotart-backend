import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { UserPalletService } from './user-pallet.service';
import { TokenService } from '../token/token.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateUserPalletRequest } from './dto/create-user-pallet.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UpdateUserPalletRequest } from './dto/update-user-pallet.dto';
import { RemoveUserPalletRequest } from './dto/delete-user-pallet.dto';

describe('UserPalletService', () => {
  let service: UserPalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPalletService,
        PrismaService,
        { provide: 'UsersServiceInterface', useClass: UsersService },
        { provide: 'TokenServiceInterface', useClass: TokenService },
      ],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    service = module.get<UserPalletService>(UserPalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdDIiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY0MDE1NzY2MSwiZXhwIjoxNjQwMTU4ODYxfQ.PJ0ejcXc3DU5r-19U2B5KRlyntyxBOVu5G_tcncMTNk';
  describe('正常系', () => {
    describe('create', () => {
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
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });
    });

    describe('findAll', () => {
      it('全ユーザパレット検索のテスト', async () => {
        try {
          await service.findAll();
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('findUserPalletId', () => {
      it('palletIdから単一ユーザパレット検索のテスト', async () => {
        const palletId = 'mono1';
        try {
          await service.findUserPalletId(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findUserPalletByName', () => {
      it('nameから単一ユーザパレット検索のテスト', async () => {
        const name = 'マイパレット（モノトーン）';
        try {
          await service.findUserPalletByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
    describe('update', () => {
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
        try {
          await service.update(req, data);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('remove', () => {
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
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
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
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
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
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
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
        try {
          await service.create(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });

      describe('findUserPalletId', () => {
        it('palletIdから単一ユーザパレット検索(palletIdが未入力)のテスト', async () => {
          const palletId = '';
          try {
            await service.findUserPalletId(palletId);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
          }
        });

        it('palletIdから単一ユーザパレット検索(palletIdが存在しない)のテスト', async () => {
          const palletId = 'testtest';
          try {
            await service.findUserPalletId(palletId);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
          }
        });
      });

      describe('findUserPalletByName', () => {
        it('nameから単一ユーザパレット検索のテスト(nameが未入力)', async () => {
          const name = '';
          try {
            await service.findUserPalletByName(name);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
          }
        });

        it('nameから単一ユーザパレット検索のテスト(nameが存在しない)', async () => {
          const name = 'testtest';
          try {
            await service.findUserPalletByName(name);
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
          }
        });
      });

      describe('update', () => {
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
          try {
            await service.update(req, data);
          } catch (err) {
            expect(err).toBeInstanceOf(Error);
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
        try {
          await service.update(req, data);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });
    });

    describe('remove', () => {
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
        try {
          await service.remove(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });

      it('ユーザパレット削除のテスト(bodyが未入力)', async () => {
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
        try {
          await service.remove(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
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
        try {
          await service.remove(req, body);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
