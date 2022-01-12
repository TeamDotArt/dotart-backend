import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RoleGuard } from '../auth/guards/role.guard';
import { PrismaService } from '../common/prisma.service';
import { BasicPalletService } from './basic-pallet.service';
import { CreateBasicPalletRequest } from './dto/create-basic-pallet.dto';

describe('BasicPalletService', () => {
  let service: BasicPalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'BasicPalletServiceInterface',
          useClass: BasicPalletService,
        },
        BasicPalletService,
        PrismaService,
      ],
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
          console.log('ベーシックパレット生成のテスト');
          result = await service.create(mock);
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
          console.log('ベーシックパレット生成のテスト');
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
          console.log('ベーシックパレット削除のテスト');
          result = await service.remove(palletId);
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
          console.log('ベーシックパレット全取得のテスト');
          result = await service.findAll();
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });

    describe('findPalletId/:palletId', () => {
      it('palletIdによる単一取得のテスト', async () => {
        const palletId = 'test2';
        let result;
        try {
          console.log('palletIdによる単一取得のテスト');
          result = await service.findBasicPalletId(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('findName/:name', () => {
      it('nameによる単一取得のテスト', async () => {
        const name = 'test2n';
        let result;
        try {
          console.log('nameによる単一取得のテスト');
          result = await service.findBasicPalletByName(name);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateProfileData', () => {
      it('ベーシックパレット更新のテスト', async () => {
        const palletId = 'test2';
        const mock = {
          name: 'test2up',
          description: '使いやすそうな色をまとめてみました。',
          data: '[testtest]',
        };
        let result;
        try {
          console.log('ベーシックパレット更新のテスト');
          result = await service.update(palletId, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('updateProfileData', () => {
      it('ベーシックパレット更新のテスト（更新前に戻す）', async () => {
        const palletId = 'test2';
        const mock = {
          name: 'test2n',
          description: '使いやすそうな色をまとめてみました。',
          data: '[testtest]',
        };
        let result;
        try {
          console.log('ベーシックパレット更新のテスト（更新前に戻す）');
          result = await service.update(palletId, mock);
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
          console.log('ベーシックパレット削除のテスト');
          result = await service.remove(palletId);
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
          console.log('ベーシックパレット生成のテスト(palletId未入力)');
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
          console.log('ベーシックパレット生成のテスト(name未入力)');
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
          console.log('ベーシックパレット削除のテスト(palletId未入力)');
          result = await service.remove(palletId);
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
          console.log('palletIdによる単一取得のテスト（palletId未入力）');
          result = await service.findBasicPalletId(palletId);
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
          console.log('nameによる単一取得のテスト(name未入力)');
          result = await service.findBasicPalletByName(name);
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
          console.log('ベーシックパレット更新のテスト(palletId未入力)');
          result = await service.update(palletId, mock);
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
          console.log('ベーシックパレット削除のテスト(palletIdがDBにない)');
          result = await service.remove(palletId);
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
          console.log('palletIdによる単一取得のテスト(palletIdがDBにない)');
          result = await service.findBasicPalletId(palletId);
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
          console.log('nameによる単一取得のテスト(palletIdがDBにない)');
          result = await service.findBasicPalletByName(name);
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
          console.log('ベーシックパレット更新のテスト(palletIdがDBにない)');
          result = await service.update(palletId, mock);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          console.log(err);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト(palletIdがDBにない)', async () => {
        const palletId = 'testtest';
        let result;
        try {
          console.log('ベーシックパレット削除のテスト(palletIdがDBにない)');
          result = await service.remove(palletId);
          console.log(result);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
          console.log(err);
        }
      });
    });
  });
});
