import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../common/prisma.service';
import { BasicPalletController } from './basic-pallet.controller';
import { BasicPalletService } from './basic-pallet.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { CreateBasicPalletRequest } from './dto/create-basic-pallet.dto';
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

  describe('正常系', () => {
    describe('createBasicPallet', () => {
      it('ベーシックパレット生成のテスト', async () => {
        const mock: CreateBasicPalletRequest = {
          palletId: 'test',
          name: 'test',
          description: 'ベーシックパレットのテストです',
          data: '[test]',
        };
        let result;
        try {
          result = await basicPalletController.createBasicPallet(mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });

      it('ベーシックパレット生成のテスト', async () => {
        const mock: CreateBasicPalletRequest = {
          palletId: 'test2',
          name: 'test2n',
          description: 'ベーシックパレットのテストです',
          data: '[testtest]',
        };
        let result;
        try {
          result = await basicPalletController.createBasicPallet(mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト', async () => {
        const palletId = 'test';
        let result;
        try {
          result = await basicPalletController.deleteBasicPallet(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('getBasicPallets', () => {
      it('ベーシックパレット全取得のテスト', async () => {
        let result;
        try {
          result = await basicPalletController.getBasicPallets();
          console.log('ベーシックパレット全取得のテスト');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('getBasicPallet/:palletId', () => {
      it('palletIdによる単一取得のテスト', async () => {
        const palletId = 'test2';
        let result;
        try {
          result = await basicPalletController.getBasicPallet(palletId);
          console.log('palletIdによる単一取得のテスト');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getBasicPalletByName/:name', () => {
      it('nameによる単一取得のテスト', async () => {
        const name = 'test2n';
        let result;
        try {
          result = await basicPalletController.getBasicPalletByName(name);
          console.log('nameによる単一取得のテスト');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
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
        let result;
        try {
          result = await basicPalletController.updateBasicPallet(
            palletId,
            mock,
          );
          console.log('ベーシックパレット更新のテスト');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
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
        let result;
        try {
          result = await basicPalletController.updateBasicPallet(
            palletId,
            mock,
          );
          console.log('ベーシックパレット更新のテスト（更新前に戻す）');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });
    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト', async () => {
        const palletId = 'test2';
        let result;
        try {
          result = await basicPalletController.deleteBasicPallet(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
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
        let result;
        try {
          result = await basicPalletController.createBasicPallet(mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotAcceptableException);
          console.log(err);
        }
      });

      it('ベーシックパレット生成のテスト(name未入力)', async () => {
        const mock = {
          palletId: 'test3',
          name: '',
          description: 'ベーシックパレットのテストです',
          data: '[test]',
        };
        let result;
        try {
          result = await basicPalletController.createBasicPallet(mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotAcceptableException);
          console.log(err);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト(palletId未入力)', async () => {
        const palletId = '';
        let result;
        try {
          result = await basicPalletController.deleteBasicPallet(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getBasicPallet/:palletId', () => {
      it('palletIdによる単一取得のテスト（palletId未入力）', async () => {
        const palletId = '';
        let result;
        try {
          result = await basicPalletController.getBasicPallet(palletId);
          console.log('palletIdによる単一取得のテスト（palletId未入力）');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getBasicPalletByName/:name', () => {
      it('nameによる単一取得のテスト(name未入力)', async () => {
        const name = '';
        let result;
        try {
          result = await basicPalletController.getBasicPalletByName(name);
          console.log('nameによる単一取得のテスト(name未入力)）');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
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
        let result;
        try {
          result = await basicPalletController.updateBasicPallet(
            palletId,
            mock,
          );
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });
    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト(palletIdがDBにない)', async () => {
        const palletId = 'test999';
        let result;
        try {
          result = await basicPalletController.deleteBasicPallet(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getBasicPallets', () => {
      it('ベーシックパレット全取得のテスト（DBにない）', async () => {
        let result;
        try {
          result = await basicPalletController.getBasicPallets();
          console.log('ベーシックパレット全取得のテスト（DBにない）');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getBasicPallet/:palletId', () => {
      it('palletIdによる単一取得のテスト(palletIdがDBにない)', async () => {
        const palletId = 'standardtest';
        let result;
        try {
          result = await basicPalletController.getBasicPallet(palletId);
          console.log('palletIdによる単一取得のテスト(palletIdがDBにない)');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('getBasicPalletByName/:name', () => {
      it('nameによる単一取得のテスト(palletIdがDBにない)', async () => {
        const name = 'スタンダードtest';
        let result;
        try {
          result = await basicPalletController.getBasicPalletByName(name);
          console.log('nameによる単一取得のテスト(palletIdがDBにない)');
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
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
        let result;
        try {
          result = await basicPalletController.updateBasicPallet(
            palletId,
            mock,
          );
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });
  });
});
