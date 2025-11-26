import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.ts";
import eventRouter from "./routes/eventRoute.ts";
import cors from "cors";   
import mongoose from "mongoose";
import "#db";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


app.use(cors({
  origin: "http://localhost:5173",  
}));

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api", eventRouter);

app.listen(port, () => console.log("Server running"));
