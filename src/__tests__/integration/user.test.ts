import request from 'supertest';

import app from '../../app';

describe('User', () => {
  it('Should be able to register', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ name: 'Felps', password: '123456' });

    expect(response.body).toHaveProperty('id');
  });
});
