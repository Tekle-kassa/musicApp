// src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const songSchema = Joi.object({
  title: Joi.string().required(),
  artist: Joi.string().required(),
  album: Joi.string().required(),
  genre: Joi.string().required(),
});

export const validateSong = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = songSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
