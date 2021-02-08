import { Request, Response } from 'express';

import Message from '../models/Message';

class MessageController {
  async index(request: Request, response: Response) {
    const { chatId } = request.body;

    const messages = await Message.findAll({
      where: { chat_id: chatId },
      order: [['created_at', 'DESC']],
    });

    if (!messages) response.json({});

    response.json(messages);
  }

  async store(request: Request, response: Response) {
    const { chatId, text } = request.body;

    const message = await Message.create({ chat_id: chatId, text });

    response.json(message);
  }
}

export default new MessageController();
