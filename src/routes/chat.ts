import express from 'express';

import ChatController from '../app/controllers/ChatController';

const router = express.Router();

router.get('/', ChatController.index);
router.post('/create', ChatController.store);

module.exports = router;
