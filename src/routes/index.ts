import express from 'express';

import authMiddleware from '../app/middlewares/auth';

const router = express.Router();

router.use('/users', require('./user'));

router.use(authMiddleware);

router.use('/chats', require('./chat'));

export default router;
