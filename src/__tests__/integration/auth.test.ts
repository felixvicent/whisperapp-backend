import request from 'supertest';

import app from '../../app';
import User from '../../app/models/User';
import Chat from '../../app/models/Chat';

describe('Auth', () => {
  beforeEach(async () => {
    await User.truncate();
    await Chat.truncate();
  });

  it('Should be able to authenticate', async () => {
    await request(app)
      .post('/users/register')
      .send({ name: 'Felps', password: '123456' });

    const user = await request(app)
      .post('/users/authenticate')
      .send({ name: 'Felps', password: '123456' });

    const response = await request(app)
      .get('/chats/')
      .set({ Authorization: `Bearer ${user.body.token}` });

    expect(response.status).toBe(200);
  });

  it('Should not be able to authenticate', async () => {
    const response = await request(app).get('/chats/');

    expect(response.status).toBe(401);
  });

  it('Should not be able to authenticate with invalid token', async () => {
    const response = await request(app)
      .get('/chats/')
      .set({ Authorization: 'sometoken' });

    expect(response.status).toBe(401);
  });
});
