import { Test, TestingModule } from '@nestjs/testing';
// Service
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { BasicPalletService } from './basic-pallet.service';
// Controller
import { BasicPalletController } from './basic-pallet.controller';
//Guard
import { RoleGuard } from '../auth/guards/role.guard';
// DTO
import { CreateBasicPalletRequest } from './dto/create-basic-pallet.dto';
// Exception
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';

describe('BasicPalletController', () => {
  let basicPalletController: BasicPalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicPalletController],
      providers: [
        {
          provide: 'BasicPalletServiceInterface',
          useClass: BasicPalletService,
        },
        { provide: 'TokenServiceInterface', useClass: TokenService },
        { provide: 'UsersServiceInterface', useClass: UsersService },
        BasicPalletService,
        PrismaService,
      ],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    basicPalletController = module.get<BasicPalletController>(
      BasicPalletController,
    );
  });

  it('should be defined', () => {
    expect(BasicPalletController).toBeDefined();
  });

  describe('正常系', () => {
    describe('createBasicPallet', () => {
      it('ベーシックパレット生成のテスト', async () => {
        const mock: CreateBasicPalletRequest = {
          palletId: 'test',
          name: 'test',
          description: 'ベーシックパレットのテストです',
          data: '[test]',
        };
        try {
          await basicPalletController.createBasicPallet(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });

      it('ベーシックパレット生成のテスト', async () => {
        const mock: CreateBasicPalletRequest = {
          palletId: 'test2',
          name: 'test2n',
          description: 'ベーシックパレットのテストです',
          data: '[testtest]',
        };
        try {
          await basicPalletController.createBasicPallet(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト', async () => {
        const palletId = 'test';
        try {
          await basicPalletController.deleteBasicPallet(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getBasicPallets', () => {
      it('ベーシックパレット全取得のテスト', async () => {
        try {
          await basicPalletController.getBasicPallets();
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('getBasicPallet/:palletId', () => {
      it('palletIdによる単一取得のテスト', async () => {
        const palletId = 'test2';
        try {
          await basicPalletController.getBasicPallet(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getBasicPalletByName/:name', () => {
      it('nameによる単一取得のテスト', async () => {
        const name = 'test2n';
        try {
          basicPalletController.getBasicPalletByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('updateBasicPallet', () => {
      it('ベーシックパレット更新のテスト', async () => {
        const palletId = 'test2';
        const mock = {
          name: 'test2up',
          description: '使いやすそうな色をまとめてみました。',
          data: '[testtest]',
        };
        try {
          await basicPalletController.updateBasicPallet(palletId, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('updateBasicPallet', () => {
      it('ベーシックパレット更新のテスト（更新前に戻す）', async () => {
        const palletId = 'test2';
        const mock = {
          name: 'test2n',
          description: '使いやすそうな色をまとめてみました。',
          data: '[testtest]',
        };
        try {
          await basicPalletController.updateBasicPallet(palletId, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト', async () => {
        const palletId = 'test2';
        try {
          await basicPalletController.deleteBasicPallet(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('異常系', () => {
    describe('createBasicPallet', () => {
      it('ベーシックパレット生成のテスト(palletId未入力)', async () => {
        const mock = {
          palletId: '',
          name: 'test2',
          description: 'ベーシックパレットのテストです',
          data: '[test]',
        };
        try {
          await basicPalletController.createBasicPallet(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotAcceptableException);
        }
      });

      it('ベーシックパレット生成のテスト(name未入力)', async () => {
        const mock = {
          palletId: 'test3',
          name: '',
          description: 'ベーシックパレットのテストです',
          data: '[test]',
        };
        try {
          await basicPalletController.createBasicPallet(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotAcceptableException);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト(palletId未入力)', async () => {
        const palletId = '';
        try {
          await basicPalletController.deleteBasicPallet(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getBasicPallet/:palletId', () => {
      it('palletIdによる単一取得のテスト（palletId未入力）', async () => {
        const palletId = '';
        try {
          await basicPalletController.getBasicPallet(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getBasicPalletByName/:name', () => {
      it('nameによる単一取得のテスト(name未入力)', async () => {
        const name = '';
        try {
          await basicPalletController.getBasicPalletByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('updateBasicPallet', () => {
      it('ベーシックパレット更新のテスト(palletId未入力)', async () => {
        const palletId = '';
        const mock = {
          name: 'スタンダード2',
          description: '使いやすそうな色をまとめてみました。',
          data: '[test]',
        };
        try {
          await basicPalletController.updateBasicPallet(palletId, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト(palletIdがDBにない)', async () => {
        const palletId = 'test999';
        try {
          await basicPalletController.deleteBasicPallet(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getBasicPallet/:palletId', () => {
      it('palletIdによる単一取得のテスト(palletIdがDBにない)', async () => {
        const palletId = 'standardtest';
        try {
          await basicPalletController.getBasicPallet(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('getBasicPalletByName/:name', () => {
      it('nameによる単一取得のテスト(palletIdがDBにない)', async () => {
        const name = 'スタンダードtest';
        try {
          await basicPalletController.getBasicPalletByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('updateBasicPallet', () => {
      it('ベーシックパレット更新のテスト(palletIdがDBにない)', async () => {
        const palletId = 'standard999';
        const mock = {
          name: 'スタンダード2',
          description: '使いやすそうな色をまとめてみました。',
          data: '[test]',
        };
        try {
          await basicPalletController.updateBasicPallet(palletId, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト(palletIdがDBにない)', async () => {
        const palletId = 'testtest';
        try {
          await basicPalletController.deleteBasicPallet(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
