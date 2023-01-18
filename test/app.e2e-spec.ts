import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const baseURL = 'http://localhost:3000';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/account (GET)', () => {
    return request(baseURL).get('/account').expect(200).expect([]);
  });
  it('/account/balance (GET)', () => {
    return request(baseURL).get('/account/balance').expect(400);
  });
  it('/account (POST)', () => {
    return request(baseURL)
      .post('/account')
      .send({
        name: 'John Doe',
        document: 'Passport',
        birth_date: '2002-02-20',
        balance: '5.99',
        daily_withdrawal_limit: '5.99',
        active: true,
        account_type: 1,
      })
      .expect(201);
  });
});