const app = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);

describe('User Endpoints', () => {
    it('GET / fibonacci', async () => {
        const res = await requestWithSupertest.get('/fibonacci');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toBeDefined();
    });
});
