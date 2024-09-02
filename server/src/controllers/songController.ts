import { Request, Response, NextFunction } from "express";
// import { v2 as cloudinary } from "cloudinary";
import cloudinary from "../config/cloudinaryConfig";
import fs from "fs";
import Song, { ISong } from "../models/songModel";

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, artist, album, genre } = req.body;
    let songImage = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "musicapp",
      });
      songImage = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const existingSong = await Song.findOne({ title, artist, album });
    if (existingSong) {
      return res.status(409).json({ message: "Song already exists" });
    }
    const newSong = new Song({ title, artist, album, genre, songImage });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const page = parseInt(req.query.page as string) || 1;
    // const limit = parseInt(req.query.limit as string) || 10;
    // const skip = (page - 1) * limit;
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const sort = (req.query.sort as string) || "title";
    const order = (req.query.order as string) || "asc";
    const sortOrder = order === "asc" ? 1 : -1;
    const songs = await Song.find()
      .skip(offset)
      .limit(pageSize)
      .sort({ [sort]: sortOrder })
      .exec();
    const totalSongs = await Song.countDocuments().exec();
    res.json({
      totalSongs,
      totalPages: Math.ceil(totalSongs / pageSize),
      currentPage: Math.ceil(offset / pageSize) + 1,
      songs,
    });
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
    const { title, artist, album, genre } = req.body;
    const existingSong = await Song.findById(req.params.id);
    let songImage = "";
    if (!existingSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "musicapp",
      });
      songImage = result.secure_url;

      fs.unlinkSync(req.file.path);
    } else {
      songImage = existingSong.songImage || "";
    }
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, album, genre, songImage },
      { new: true }
    );
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
export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalSongs = await Song.countDocuments().exec();
    const genres = await Song.distinct("genre").exec();
    const artists = await Song.distinct("artist").exec();
    const albums = await Song.distinct("album").exec();
    res.json({
      totalSongs,
      genres: genres.length,
      artists: artists.length,
      albums: albums.length,
    });
  } catch (error) {
    next(error);
  }
};
export const getSongsByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.find({ genre: req.params.genre }).exec();
    res.json(songs);
  } catch (error) {
    next(error);
  }
};
export const getSongsByArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.find({ artist: req.params.artist }).exec();
    res.json(songs);
  } catch (error) {
    next(error);
  }
};
