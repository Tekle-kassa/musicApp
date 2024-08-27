import express from "express";
import { createSong } from "../controllers/songController";
import { validateSong } from "../middleware/validate";

const router = express.Router();

router.post("/", validateSong, createSong);

export default router;
