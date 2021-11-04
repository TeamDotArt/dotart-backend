import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BasicPalletModule } from './../../src/basic-pallet/basic-pallet.module';
import { INestApplication } from '@nestjs/common';

describe('SamplesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [BasicPalletModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/basic-pallet (GET)', (done) => {
    return request(app.getHttpServer()).get('/basic-pallet').expect(200, done);
  });
});
