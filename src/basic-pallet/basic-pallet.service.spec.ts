import { Test, TestingModule } from '@nestjs/testing';
import { RoleGuard } from '../../src/auth/guards/role.guard';
import { PrismaService } from '../common/prisma.service';
import { BasicPalletService } from './basic-pallet.service';
import { CreateBasicPalletResponse } from './dto/create-basic-pallet.dto';
import { RemoveBasicPalletResponse } from './dto/delete-basic-pallet.dto';
import { FindBasicPalletResponse } from './dto/find-basic-pallet.dto';
import { FindAllBasicPalletResponse } from './dto/findAll-basic-pallet.dto';
import { UpdateBasicPalletResponse } from './dto/update-basic-pallet.dto';

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
        const mock = {
          palletId: 'test',
          name: 'test',
          description: 'ベーシックパレットのテストです',
          data: '[test]',
        };
        let result;
        try {
          result = await service.create(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(CreateBasicPalletResponse);
          expect(result.palletId).toEqual('test');
        }
      });
    });

    describe('removeBasicPalletData', () => {
      it('ベーシックパレット削除のテスト', async () => {
        const palletId = 'test';
        let result;
        try {
          result = await service.removeBasicPalletData(palletId);
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
          result = await service.findAll();
          result.map((pallet, i) => {
            expect(pallet.palletId).toEqual(test[i]);
          });
        } catch (err) {
          expect(err).toBeInstanceOf(FindAllBasicPalletResponse);
          expect(result.palletId).toEqual(test[i]);
        }
      });
    });

    describe('findPalletId/:palletId', () => {
      it('palletIdによる単一取得のテスト', async () => {
        const palletId = 'standard';
        let result;
        try {
          result = await service.findByBasicPalletId(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(FindBasicPalletResponse);
          expect(result.name).toEqual('スタンダード');
        }
      });
    });

    describe('findName/:name', () => {
      it('nameによる単一取得のテスト', async () => {
        const name = 'スタンダード';
        let result;
        try {
          result = await service.findByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(FindBasicPalletResponse);
          expect(result.palletId).toEqual('standard');
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
        } catch (err) {
          expect(err).toBeInstanceOf(UpdateBasicPalletResponse);
          expect(result.palletId).toEqual('standard');
          expect(result.palletId).toMatchSnapshot('standard');
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
          result = await service.create(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(CreateBasicPalletResponse);
          expect(result.palletId).toEqual('');
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
          await service.create(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(CreateBasicPalletResponse);
          expect(result.palletId).toEqual('test3');
        }
      });
    });

    describe('removeBasicPalletData', () => {
      it('ベーシックパレット削除のテスト(palletId未入力)', async () => {
        const palletId = '';
        let result;
        try {
          result = await service.removeBasicPalletData(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(RemoveBasicPalletResponse);
          expect(result.palletId).toEqual('');
        }
      });

      it('ベーシックパレット削除のテスト(name未入力)', async () => {
        const palletId = 'test3';
        let result;
        try {
          result = await service.removeBasicPalletData(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(RemoveBasicPalletResponse);
          expect(result.palletId).toEqual('test3');
        }
      });
    });
  });
});
