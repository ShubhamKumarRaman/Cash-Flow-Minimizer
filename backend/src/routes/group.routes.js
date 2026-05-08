import express from "express";
import { createGroup, getGroupById, getGroups, updateGroup } from "../controllers/group.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/', protect, createGroup);
router.get('/', protect, getGroups);
router.get('/:id', protect, getGroupById);
router.put('/:id', protect, updateGroup);

export default router;