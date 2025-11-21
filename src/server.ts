import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.ts";
import "#db";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(port, () => console.log("Server running"));
