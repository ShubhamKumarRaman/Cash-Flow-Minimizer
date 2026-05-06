import express from 'express'
import { getSettlement } from '../controllers/settlement.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:groupId', protect, getBalances);

export default router;