import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Chat from '../models/Chat';

class ChatController {
  async index(request: Request, response: Response) {
    return response.status(200).json({});
  }

  async store(request: Request, response: Response) {
    const { recipient_id: recipientId } = request.body;

    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { user_id: request.userId },
          { recipient_id: request.userId },
          { user_id: recipientId },
          { recipient_id: recipientId },
        ],
      },
    });

    if (chat) return response.json(chat);

    const newChat = await Chat.create({
      user_id: request.userId,
      recipient_id: recipientId,
    });

    return response.json(newChat);
  }
}

export default new ChatController();
