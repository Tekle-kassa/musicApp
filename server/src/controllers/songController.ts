import { Request, Response, NextFunction } from "express";
import Song from "../models/songModel";

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, artist, album, genre } = req.body;
    const newSong = new Song({ title, artist, album, genre });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    next(error);
  }
};
export const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};
export const getSongById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
};

export const updateSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(updatedSong);
  } catch (error) {
    next(error);
  }
};

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    next(error);
  }
};
