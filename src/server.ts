import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "#db/db.ts";
import authRoutes from "#routes/authRoute.ts";
import userRoutes from "#routes/profileRoutes.ts";
import profileRoutes from "#routes/profileRoutes.ts";
import errorHandler from "#middlewares/errorHandler.ts";
import notFoundHandler from "#middlewares/notFoundHandler.ts";

import { toNodeHandler } from "better-auth/node";
import { auth } from "#auth/auth.ts";

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth/native", toNodeHandler(auth));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.use("*splat", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
