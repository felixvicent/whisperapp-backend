import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import authConfig from '../../config/auth';

export default async (request: Request, response: Response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded: any = jwt.verify(token, authConfig.secret);

    request.userId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalid', err });
  }
};
