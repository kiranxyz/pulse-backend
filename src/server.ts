import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/authRoute.ts";
import eventRouter from "./routes/eventRoute.ts";
import stripeRouter from "./routes/stripeRouter.ts";
import registerParticipantRoute from "./routes/registerParticipantRoute.ts";
import mongoose from "mongoose";
import "#db";

import path from "path";
import { connectDB } from "#db/db.ts";
import profileRoutes from "#routes/profileRoutes.ts";
import errorHandler from "#middlewares/errorHandler.ts";
import notFoundHandler from "#middlewares/notFoundHandler.ts";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "#auth/auth.ts";

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use("/api/auth/native", toNodeHandler(auth));

app.use(express.json());

app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    app.listen(PORT, () => console.log("Server running"));
    if (!session) {
      return res.status(401).json({ user: null });
    }

    return res.json({
      user: session.user,
      session: {
        id: session.session.id,
        expiresAt: session.session.expiresAt,
      },
    });
  } catch (err) {
    console.error("Error in /api/me", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));

app.use("/api/profile", profileRoutes);
app.use("/api/events", eventRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/registerParticipant", registerParticipantRoute);

app.use("*splat", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
