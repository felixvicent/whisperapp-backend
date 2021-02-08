import { Request, Response } from 'express';
import { Op } from 'sequelize';

import User from '../models/User';

class UserController {
  async index(request: Request, response: Response) {
    const users = await User.findAll({
      where: { id: { [Op.ne]: request.userId } },
    });

    if (!users) response.json([]);

    response.json(users);
  }

  async store(request: Request, response: Response) {
    const { name } = request.body;

    const user = await User.findOne({ where: { name } });

    if (user)
      return response.status(400).json({ error: 'User already exists' });

    const newUser = await User.create(request.body);

    return response.json(newUser);
  }
}

export default new UserController();
