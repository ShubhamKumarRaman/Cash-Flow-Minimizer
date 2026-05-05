import express from "express";
import { createGroup, getGroups } from "../controllers/group.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post('/', protect, createGroup);
router.get('/', protect, getGroups);

export default router;