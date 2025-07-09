import { app } from '../src/index';
const supertest = require('supertest');
const requestWithSupertest = supertest(app);


describe('Testing index file', () => {

  it('GET /api/songs should return all songs', async () => {
    const res = await requestWithSupertest.get('/api/songs');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('songs')
  });

});