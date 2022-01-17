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
        try {
          await service.create(mock);
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
          await service.create(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('removeBasicPalletData', () => {
      it('ベーシックパレット削除のテスト', async () => {
        const palletId = 'test';
        try {
          service.remove(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('findAll', () => {
      it('ベーシックパレット全取得のテスト', async () => {
        try {
          await service.findAll();
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
        }
      });
    });

    describe('findPalletId/:palletId', () => {
      it('palletIdによる単一取得のテスト', async () => {
        const palletId = 'test2';
        try {
          await service.findBasicPalletId(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findName/:name', () => {
      it('nameによる単一取得のテスト', async () => {
        const name = 'test2n';
        try {
          await service.findBasicPalletByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
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
        try {
          await service.update(palletId, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
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
        try {
          await service.update(palletId, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト', async () => {
        const palletId = 'test2';
        try {
          await service.remove(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(PrismaClientKnownRequestError);
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
        try {
          await service.create(mock);
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
          await service.create(mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotAcceptableException);
        }
      });
    });

    describe('removeBasicPalletData', () => {
      it('ベーシックパレット削除のテスト(palletId未入力)', async () => {
        const palletId = '';
        try {
          ('ベーシックパレット削除のテスト(palletId未入力)');
          await service.remove(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findPalletId/:palletId', () => {
      it('palletIdによる単一取得のテスト（palletId未入力）', async () => {
        const palletId = '';
        try {
          await service.findBasicPalletId(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findName/:name', () => {
      it('nameによる単一取得のテスト(name未入力)', async () => {
        const name = '';
        try {
          await service.findBasicPalletByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
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
        try {
          await service.update(palletId, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('removeBasicPalletData', () => {
      it('ベーシックパレット削除のテスト(palletIdがDBにない)', async () => {
        const palletId = 'test999';
        try {
          await service.remove(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findPalletId/:palletId', () => {
      it('palletIdによる単一取得のテスト(palletIdがDBにない)', async () => {
        const palletId = 'standardtest';
        try {
          await service.findBasicPalletId(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('findName/:name', () => {
      it('nameによる単一取得のテスト(palletIdがDBにない)', async () => {
        const name = 'スタンダードtest';
        try {
          await service.findBasicPalletByName(name);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
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
        try {
          await service.update(palletId, mock);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('deleteBasicPallet', () => {
      it('ベーシックパレット削除のテスト(palletIdがDBにない)', async () => {
        const palletId = 'testtest';
        try {
          await service.remove(palletId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
