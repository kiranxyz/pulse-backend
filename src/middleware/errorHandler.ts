import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  process.env.NODE_ENV !== "production" && console.error(err.stack);
  if (err instanceof Error) {
    if (err.cause) {
      const cause = err.cause as { status: number; code?: string };
      res
        .status(cause.status ?? 500)
        .json({ message: err.message, code: cause.code });
      return;
    }
    res.status(500).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: "Internal server error" });
  return;
};

export default errorHandler;
