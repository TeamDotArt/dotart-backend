import { Test, TestingModule } from '@nestjs/testing';
import { BasicPalletController } from './basic-pallet.controller';
import { BasicPalletService } from './basic-pallet.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { PrismaService } from '../common/prisma.service';
import { CreateBasicPalletRequest } from './dto/create-basic-pallet.dto';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

describe('BasicPalletController', () => {
  let basicPalletController: BasicPalletController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BasicPalletController],
      providers: [BasicPalletService, PrismaService],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();
    basicPalletController = moduleRef.get<BasicPalletController>(
      BasicPalletController,
    );
  });

  describe('正常系', () => {
    describe('create', () => {
      it('ベーシックパレット生成のテスト', async () => {
        const mock: CreateBasicPalletRequest = {
          palletId: 'test',
          name: 'test',
          description: 'ベーシックパレットのテストです',
          data: '[test]',
        };
        let result;
        try {
          result = await basicPalletController.create(mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('removeBasicPalletData', () => {
      it('ベーシックパレット削除のテスト', async () => {
        const palletId = 'test';
        let result;
        try {
          result = await basicPalletController.removeBasicPalletData(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findAll', () => {
      it('ベーシックパレット全取得のテスト', async () => {
        let result;
        try {
          result = await basicPalletController.findAll();
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findPalletId/:palletId', () => {
      it('palletIdによる単一取得のテスト', async () => {
        const palletId = 'standard';
        let result;
        try {
          result = await basicPalletController.findByBasicPalletId(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findName/:name', () => {
      it('nameによる単一取得のテスト', async () => {
        const name = 'スタンダード';
        let result;
        try {
          result = await basicPalletController.findByName(name);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('updateProfileData', () => {
      it('ベーシックパレット更新のテスト', async () => {
        const palletId = 'standard';
        const mock = {
          name: 'スタンダード2',
          description: '使いやすそうな色をまとめてみました。',
          data: '[test]',
        };
        let result;
        try {
          result = await basicPalletController.updateProfileData(
            palletId,
            mock,
          );
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('updateProfileData', () => {
      it('ベーシックパレット更新のテスト（更新前に戻す）', async () => {
        const palletId = 'standard';
        const mock = {
          name: 'スタンダード',
          description: '使いやすそうな色をまとめてみました。',
          data: '[test]',
        };
        let result;
        try {
          result = await basicPalletController.updateProfileData(
            palletId,
            mock,
          );
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
      it('ベーシックパレット生成のテスト(palletId未入力)', async () => {
        const mock = {
          palletId: '',
          name: 'test2',
          description: 'ベーシックパレットのテストです',
          data: '[test]',
        };
        let result;
        try {
          result = await basicPalletController.create(mock);
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
          result = await basicPalletController.create(mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotAcceptableException);
          console.log(err);
        }
      });
    });

    describe('removeBasicPalletData', () => {
      it('ベーシックパレット削除のテスト(palletId未入力)', async () => {
        const palletId = '';
        let result;
        try {
          result = await basicPalletController.removeBasicPalletData(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findPalletId/:palletId', () => {
      it('palletIdによる単一取得のテスト（palletId未入力）', async () => {
        const palletId = '';
        let result;
        try {
          result = await basicPalletController.findByBasicPalletId(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findName/:name', () => {
      it('nameによる単一取得のテスト(name未入力)', async () => {
        const name = '';
        let result;
        try {
          result = await basicPalletController.findByName(name);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateProfileData', () => {
      it('ベーシックパレット更新のテスト(palletId未入力)', async () => {
        const palletId = '';
        const mock = {
          name: 'スタンダード2',
          description: '使いやすそうな色をまとめてみました。',
          data: '[test]',
        };
        let result;
        try {
          result = await basicPalletController.updateProfileData(
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
    describe('removeBasicPalletData', () => {
      it('ベーシックパレット削除のテスト(palletIdがDBにない)', async () => {
        const palletId = 'test999';
        let result;
        try {
          result = await basicPalletController.removeBasicPalletData(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findAll', () => {
      it('ベーシックパレット全取得のテスト（DBにない）', async () => {
        let result;
        try {
          result = await basicPalletController.findAll();
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findPalletId/:palletId', () => {
      it('palletIdによる単一取得のテスト(palletIdがDBにない)', async () => {
        const palletId = 'standardtest';
        let result;
        try {
          result = await basicPalletController.findByBasicPalletId(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findName/:name', () => {
      it('nameによる単一取得のテスト(palletIdがDBにない)', async () => {
        const name = 'スタンダードtest';
        let result;
        try {
          result = await basicPalletController.findByName(name);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateProfileData', () => {
      it('ベーシックパレット更新のテスト(palletIdがDBにない)', async () => {
        const palletId = 'standard999';
        const mock = {
          name: 'スタンダード2',
          description: '使いやすそうな色をまとめてみました。',
          data: '[test]',
        };
        let result;
        try {
          result = await basicPalletController.updateProfileData(
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
