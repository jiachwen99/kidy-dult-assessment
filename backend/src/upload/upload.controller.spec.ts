import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

describe('UploadController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [UploadService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST upload', () => {
    it('should return the word counts for one file', async () => {
      const response = await request(app.getHttpServer())
        .post('/upload')
        .attach('files', './public/test-files/1.txt')
        .expect(200);

      const userWordCounts = response.body;
      expect(userWordCounts).toBeDefined();
      expect(Array.isArray(userWordCounts)).toBeTruthy();
      expect(userWordCounts.length).toBe(3);

      expect(userWordCounts[0].username).toContain('Adam');
      expect(userWordCounts[0].wordCount).toBe(18);
      expect(userWordCounts[1].username).toBe('JCTan');
      expect(userWordCounts[1].wordCount).toBe(13);
      expect(userWordCounts[2].username).toBe('Bob');
      expect(userWordCounts[2].wordCount).toBe(8);
    });

    it('should return the word counts for multiple uploaded files', async () => {
      const response = await request(app.getHttpServer())
        .post('/upload')
        .attach('files', './public/test-files/1.txt')
        .attach('files', './public/test-files/2.txt')
        .expect(200);

      const userWordCounts = response.body;
      expect(userWordCounts).toBeDefined();
      expect(Array.isArray(userWordCounts)).toBeTruthy();
      expect(userWordCounts.length).toBe(5);

      expect(userWordCounts[0].username).toContain('Adam');
      expect(userWordCounts[0].wordCount).toBe(34);
      expect(userWordCounts[1].username).toBe('JCTan');
      expect(userWordCounts[1].wordCount).toBe(17);
      expect(userWordCounts[2].username).toBe('Elicy');
      expect(userWordCounts[2].wordCount).toBe(14);
      expect(userWordCounts[3].username).toBe('Bob');
      expect(userWordCounts[3].wordCount).toBe(8);
      expect(userWordCounts[4].username).toBe('Foo');
      expect(userWordCounts[4].wordCount).toBe(5);
    });
  });
});
