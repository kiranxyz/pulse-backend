import { Router } from "express";
import { checkIn } from "../../src/controllers/checkinController.ts";
import { requireAuth } from "#middlewares/requireAuth.ts";
const checkInRouter = Router();
checkInRouter.use(requireAuth);
checkInRouter.post("/", checkIn);

export default checkInRouter;
