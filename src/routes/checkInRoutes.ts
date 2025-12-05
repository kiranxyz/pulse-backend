import { Router } from "express";
import { checkIn } from "../../src/controllers/checkinController.ts";
import { requireAuth } from "#middlewares/requireAuth.ts";
const checkInRouter = Router();
console.log("Check-in route initialized1");

checkInRouter.use(requireAuth);
console.log("Check-in route initialized");
checkInRouter.post("/", checkIn);

export default checkInRouter;
