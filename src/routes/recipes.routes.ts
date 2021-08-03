import { Router } from "express";
import routerHelper from "../helpers/routerHelper";
import newRecipe from "../controllers/recipes/newRecipe.controller";

const router = Router();

router.post("/create", routerHelper(newRecipe));

export default router;
