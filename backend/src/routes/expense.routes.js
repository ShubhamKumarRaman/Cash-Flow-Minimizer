import express from 'express'
import { addExpense, getExpenses } from '../controllers/expense.controller'
import { protect } from '../middlewares/auth.middleware'

const router = express.Router();

router.post('/', protect, addExpense);
router.get('/:groupId', protect, getExpenses);

export default router;