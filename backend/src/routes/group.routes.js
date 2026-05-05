import express from "express";
import { createGroup, getGroups } from "../controllers/group.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/', protect, createGroup);
router.get('/', protect, getGroups);

export default router;