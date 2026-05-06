import express from 'express'
import { getMCMFSettlement } from '../controllers/mcmf.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('/:groupId', protect, getMCMFSettlement);

export default router;