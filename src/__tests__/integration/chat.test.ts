import request from 'supertest';

import app from '../../app';
import User from '../../app/models/User';
import Chat from '../../app/models/Chat';

describe('Chat', () => {
  beforeEach(async () => {
    await User.truncate();
    await Chat.truncate();
  });

  it('Should be able do create a chat', async () => {
    await request(app)
      .post('/users/register')
      .send({ name: 'Felps', password: '123456' });

    await request(app)
      .post('/users/register')
      .send({ name: 'Sophia', password: '123456' });

    const user1 = await request(app)
      .post('/users/authenticate')
      .send({ name: 'Felps', password: '123456' });

    const user2 = await request(app)
      .post('/users/authenticate')
      .send({ name: 'Sophia', password: '123456' });

    const response = await request(app)
      .post('/chats/create')
      .set({ Authorization: `Bearer ${user1.body.token}` })
      .send({ recipient_id: user2.body.user.id });

    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to open a already exist chat instead of create', async () => {
    await request(app)
      .post('/users/register')
      .send({ name: 'Felps', password: '123456' });

    await request(app)
      .post('/users/register')
      .send({ name: 'Sophia', password: '123456' });

    const user1 = await request(app)
      .post('/users/authenticate')
      .send({ name: 'Felps', password: '123456' });

    const user2 = await request(app)
      .post('/users/authenticate')
      .send({ name: 'Sophia', password: '123456' });

    await request(app)
      .post('/chats/create')
      .set({ Authorization: `Bearer ${user1.body.token}` })
      .send({ recipient_id: user2.body.user.id });

    const response = await request(app)
      .post('/chats/create')
      .set({ Authorization: `Bearer ${user1.body.token}` })
      .send({ recipient_id: user2.body.user.id });

    expect(response.body).toHaveProperty('id');
  });
});
