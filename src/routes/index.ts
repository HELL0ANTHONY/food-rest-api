import { Router } from "express";
import types from "./types.routes";
import recipes from "./recipes.routes";
const router = Router();

router.use("/food", types);
router.use("/food", recipes);

export default router;
