import { Test } from '@nestjs/testing';
import { BasicPalletController } from './basic-pallet.controller';
import { BasicPalletService } from './basic-pallet.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { PrismaService } from '../common/prisma.service';
import { CreateBasicPalletRequest } from './dto/create-basic-pallet.dto';
import { RemoveBasicPalletResponse } from './dto/delete-basic-pallet.dto';
import { FindAllBasicPalletResponse } from './dto/findAll-basic-pallet.dto';
import { FindBasicPalletResponse } from './dto/find-basic-pallet.dto';
import { UpdateBasicPalletResponse } from './dto/update-basic-pallet.dto';

describe('BasicPalletController', () => {
  let basicPalletController: BasicPalletController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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
        } catch (err) {
          expect(err).toBeInstanceOf(CreateBasicPalletRequest);
          expect(result.palletId).toEqual('test');
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
        } catch (err) {
          expect(err).toBeInstanceOf(RemoveBasicPalletResponse);
          expect(result.palletId).toEqual('test');
        }
      });
    });

    describe('findAll', () => {
      it('ベーシックパレット全取得のテスト', async () => {
        const test = ['monoqlo', 'retroGame', 'standard'];
        let result;
        let i;
        try {
          result = await basicPalletController.findAll();
          result.map((pallet, i) => {
            expect(pallet.palletId).toEqual(test[i]);
          });
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(FindAllBasicPalletResponse);
          expect(result.palletId).toEqual(test[i]);
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
        } catch (err) {
          expect(err).toBeInstanceOf(FindBasicPalletResponse);
          expect(result.name).toEqual('スタンダード');
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
          expect(err).toBeInstanceOf(FindBasicPalletResponse);
          expect(result.palletId).toEqual('standard');
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
          expect(err).toBeInstanceOf(UpdateBasicPalletResponse);
          expect(result.palletId).toEqual('standard');
          expect(result.palletId).toMatchSnapshot('standard');
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
          expect(err).toBeInstanceOf(UpdateBasicPalletResponse);
          expect(result.palletId).toEqual('standard');
          expect(result.palletId).toMatchSnapshot('standard');
        }
      });
    });
  });

  describe('例外系', () => {
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
        } catch (err) {
          expect(err).toBeInstanceOf(CreateBasicPalletRequest);
          expect(result.palletId).toEqual('');
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
        } catch (err) {
          expect(err).toBeInstanceOf(CreateBasicPalletRequest);
          expect(result.palletId).toEqual('test3');
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
        } catch (err) {
          expect(err).toBeInstanceOf(RemoveBasicPalletResponse);
          expect(result.palletId).toEqual('');
          console.log(err);
        }
      });

      it('ベーシックパレット削除のテスト(name未入力)', async () => {
        const palletId = 'test3';
        let result;
        try {
          result = await basicPalletController.removeBasicPalletData(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(RemoveBasicPalletResponse);
          expect(result.palletId).toEqual('test3');
        }
      });
    });
  });
});
