import express from 'express';

const router = express.Router();

router.use('/users', require('./user'));

export default router;
