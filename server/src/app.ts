import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectdb from "./config/db";
import cors from "./config/cors";
import songRoutes from "./routes/songRoutes";
import { errorHandler } from "./middleware/errorHandler";
const app: Application = express();

app.use(express.json());
app.use(cors);
app.use("/api", songRoutes);
connectdb();
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
app.use(errorHandler);
export default app;
