import express from 'express'
import { exportReport } from '../controllers/export.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('/:groupId', protect, exportReport);

export default router;