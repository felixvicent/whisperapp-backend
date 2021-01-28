import express from 'express';

import userController from '../app/controllers/UserController';

const router = express.Router();

router.post('/register', userController.store);

module.exports = router;
