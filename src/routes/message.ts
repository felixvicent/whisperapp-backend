import express from 'express';

import MessageController from '../app/controllers/MessageController';

const router = express.Router();

router.post('/', MessageController.index);
router.post('/create', MessageController.store);

module.exports = router;
