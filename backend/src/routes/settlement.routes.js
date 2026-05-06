import express from 'express'
import { getBalances, getSettlement } from '../controllers/settlement.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/balances/:groupId', protect, getBalances);
router.get('/optimize/:groupId', protect, getSettlement);

export default router;