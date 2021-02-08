import request from 'supertest';

import User from '../../app/models/User';

import app from '../../app';

describe('User', () => {
  beforeEach(async () => {
    await User.truncate();
  });

  it('Should be able to list all users', async () => {
    await request(app)
      .post('/users/register')
      .send({ name: 'Felps', password: '123456' });

    const user = await request(app)
      .post('/users/authenticate')
      .send({ name: 'Felps', password: '123456' });

    await request(app)
      .post('/users/register')
      .send({ name: 'Sophia', password: '123456' });

    const response = await request(app)
      .get('/users/')
      .set({ Authorization: `Bearer ${user.body.token}` });

    expect(response.body).toHaveLength(1);
  });

  describe('Register', () => {
    it('Should be able to register', async () => {
      const response = await request(app)
        .post('/users/register')
        .send({ name: 'Felps', password: '123456' });

      expect(response.body).toHaveProperty('id');
    });

    it('Should not be able to register with a user already used', async () => {
      await request(app)
        .post('/users/register')
        .send({ name: 'Felps', password: '123456' });

      const response = await request(app)
        .post('/users/register')
        .send({ name: 'Felps', password: '123456' });

      expect(response.status).toBe(400);
    });
  });

  describe('Authenticate', () => {
    it('Should be able to authenticate', async () => {
      await request(app)
        .post('/users/register')
        .send({ name: 'Felps', password: '123456' });

      const response = await request(app)
        .post('/users/authenticate')
        .send({ name: 'Felps', password: '123456' });

      expect(response.body).toHaveProperty('token');
    });

    it('Should be not able to authenticate a not registered user', async () => {
      const response = await request(app)
        .post('/users/authenticate')
        .send({ name: 'Sophia', password: '123456' });

      expect(response.status).toBe(401);
    });

    it('Should be not able to authenticate with a wrong password', async () => {
      await request(app)
        .post('/users/register')
        .send({ name: 'Felps', password: '123456' });

      const response = await request(app)
        .post('/users/authenticate')
        .send({ name: 'Felps', password: '654321' });

      expect(response.status).toBe(401);
    });
  });
});
