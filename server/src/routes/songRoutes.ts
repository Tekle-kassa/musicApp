import express from "express";
import {
  createSong,
  deleteSong,
  getSongById,
  getSongs,
  getSongsByArtist,
  getSongsByGenre,
  getStatistics,
  updateSong,
} from "../controllers/songController";
import { validateSong } from "../middleware/validate";

const router = express.Router();

router.post("/songs", validateSong, createSong);
router.get("/songs", getSongs);
router.get("/songs/statistics", getStatistics);
router.get("/songs/:id", getSongById);
router.put("/songs/:id", updateSong);
router.delete("/songs/:id", deleteSong);
router.get("/songs/genre/:genre", getSongsByGenre);
router.get("/songs/artist/:artist", getSongsByArtist);
export default router;
