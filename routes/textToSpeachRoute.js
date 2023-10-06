import express from "express";
import { textToSpeach } from "../controllers/index.js";

const router = express.Router();

router.post("/", textToSpeach);

export default router;
