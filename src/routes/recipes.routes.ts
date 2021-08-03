import { Router } from "express";
import routerHelper from "../helpers/routerHelper";
import newRecipe from "../controllers/recipes/newRecipe.controller";
import getRecipe from "../controllers/recipes/getRecipe.controller";

const router = Router();

router.post("/create", routerHelper(newRecipe));
router.get("/recipe/:id", routerHelper(getRecipe));

export default router;
