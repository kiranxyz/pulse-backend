import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../controllers/categoriesController.ts";
import { Router } from "express";

const route = Router();

route.get("/", getAllCategories);
route.post("/", addCategory);
route.delete("/", deleteCategory);

export default route;
