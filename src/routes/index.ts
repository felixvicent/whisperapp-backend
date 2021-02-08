import express from 'express';

import authMiddleware from '../app/middlewares/auth';

const router = express.Router();

router.get('/', (req, res) => res.json({ ok: true }));
router.use('/users', require('./user'));

router.use(authMiddleware);

router.use('/chats', require('./chat'));
router.use('/messages', require('./message'));

export default router;
