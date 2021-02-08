import express from 'express';

import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';

import authMiddleware from '../app/middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware, UserController.index);

router.post('/register', UserController.store);
router.post('/authenticate', SessionController.store);

module.exports = router;
