import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: App;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    appService = app.get(AppService);
    await app.init();
  });

  describe('GET /', () => {
    it('should return 403 when no api key', () => {
      return request(server).get('/').expect(403);
    });

    it('should return 403 when incorrect api key', () => {
      return request(server).get('/').set('x-api-key', 'incorrect').expect(403);
    });

    it('should return 200 when correct api key', () => {
      return request(server).get('/').set('x-api-key', 'SECRET').expect(200);
    });

    it('should return 400 when index is not a number', () => {
      return request(server)
        .get('/?index=non-number')
        .set('x-api-key', 'SECRET')
        .expect(400);
    });

    it('should return 400 when index is out of range', () => {
      const emojis = appService.getEmojis();
      const outOfRangeIndex = emojis.length + 1;
      return request(server)
        .get(`/?index=${outOfRangeIndex}`)
        .set('x-api-key', 'SECRET')
        .expect(400);
    });

    it('should return correct emoji when index is in range', () => {
      const emojis = appService.getEmojis();
      const inRangeIndex = 0;
      return request(server)
        .get(`/?index=${inRangeIndex}`)
        .set('x-api-key', 'SECRET')
        .expect(({ body }) => {
          expect(body.data.emoji).toBe(emojis[inRangeIndex]);
        });
    });

    it('should return random emoji and browser when index and user-agent are provided', () => {
      const emojis = appService.getEmojis();
      return request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .set('user-agent', 'Chrome')
        .expect(({ body }) => {
          expect(emojis).toContain(body.data.emoji);
          expect(body.data.browser).toBe('Chrome');
        });
    });

    it('should return Unknown when user-agent is not provided', () => {
      return request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .expect(({ body }) => {
          expect(body.data.browser).toBe('Unknown');
        });
    });
  });
});
