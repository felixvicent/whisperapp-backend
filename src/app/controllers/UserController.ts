import { Request, Response } from 'express';

import User from '../models/User';

class UserController {
  async store(request: Request, response: Response) {
    const user = await User.create(request.body);

    return response.json(user);
  }
}

export default new UserController();
