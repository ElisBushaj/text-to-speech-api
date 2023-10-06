import express from "express";
import { getSupportedLanguages } from "../controllers/index.js";

const router = express.Router();

router.get("/", getSupportedLanguages);

export default router;
