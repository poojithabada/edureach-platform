import { Router } from "express";
import { startCall } from "../controllers/vapi.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/call", authMiddleware, startCall);

export default router;