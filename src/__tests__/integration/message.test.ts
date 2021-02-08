import request from 'supertest';

import app from '../../app';

import Chat from '../../app/models/Chat';
import User from '../../app/models/User';
import Message from '../../app/models/Message';

describe('Message', () => {
  beforeEach(async () => {
    await User.truncate();
    await Chat.truncate();
    await Message.truncate();
  });

  it('Should be able to list messages of a chat', async () => {
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

    const chat = await request(app)
      .post('/chats/create')
      .set({ Authorization: `Bearer ${user1.body.token}` })
      .send({ recipient_id: user2.body.user.id });

    await request(app)
      .post('/messages/create')
      .set({ Authorization: `Bearer ${user1.body.token}` })
      .send({ chatId: chat.body.id, text: 'Some text' });

    const response = await request(app)
      .post('/messages/')
      .set({ Authorization: `Bearer ${user1.body.token}` })
      .send({ chatId: chat.body.id });

    expect(response.body).toHaveLength(1);
  });

  it('Should be able to create a message', async () => {
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

    const chat = await request(app)
      .post('/chats/create')
      .set({ Authorization: `Bearer ${user1.body.token}` })
      .send({ recipient_id: user2.body.user.id });

    const response = await request(app)
      .post('/messages/create')
      .set({ Authorization: `Bearer ${user1.body.token}` })
      .send({ chatId: chat.body.id, text: 'Some text' });

    expect(response.body).toHaveProperty('id');
  });
});
