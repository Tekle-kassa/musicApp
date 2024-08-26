import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

const app: Application = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
export default app;
