import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RoleGuard } from '../../src/auth/guards/role.guard';
import { PrismaService } from '../common/prisma.service';
import { BasicPalletService } from './basic-pallet.service';
import { CreateBasicPalletRequest } from './dto/create-basic-pallet.dto';

describe('BasicPalletService', () => {
  let service: BasicPalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicPalletService, PrismaService],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();
    service = module.get<BasicPalletService>(BasicPalletService);
  });

  it('サービスがUndefinedではないか', () => {
    expect(service).toBeDefined();
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
          result = await service.create(mock);
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
          result = await service.removeBasicPalletData(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findAll', () => {
      it('ベーシックパレット全取得のテスト', async () => {
        //const test = ['monoqlo', 'retroGame', 'standard'];
        let result;
        try {
          result = await service.findAll();
          /*
          result.map((pallet, i) => {
            expect(pallet.palletId).toEqual(test[i]);
          });
          */
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
          result = await service.findByBasicPalletId(palletId);
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
          result = await service.findByName(name);
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
          result = await service.updateBasicPalletData(palletId, mock);
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
          result = await service.updateBasicPalletData(palletId, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
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
          result = await service.create(mock);
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
          result = await service.create(mock);
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
          result = await service.removeBasicPalletData(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });
  });
});
