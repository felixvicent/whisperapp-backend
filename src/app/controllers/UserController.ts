import { Request, Response } from 'express';

import User from '../models/User';

class UserController {
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
