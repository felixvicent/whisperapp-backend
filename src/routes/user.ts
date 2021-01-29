import express from 'express';

import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';

const router = express.Router();

router.post('/register', UserController.store);
router.post('/authenticate', SessionController.store);

module.exports = router;
