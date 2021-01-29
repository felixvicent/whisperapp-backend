import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(request: Request, response: Response) {
    const { name, password } = request.body;

    const user = await User.findOne({ where: { name } });

    if (!user) return response.status(401).json({ error: 'User not found' });

    if (!(await user.checkPassword(password)))
      return response.status(401).json({ error: 'Password does not match' });

    const { id } = user;

    return response.json({
      user: { id, name },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
