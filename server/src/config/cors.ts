import { Request, Response, NextFunction } from "express";

const setCorsHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

export default setCorsHeaders;
