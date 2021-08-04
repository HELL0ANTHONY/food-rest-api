import { Router } from "express";
import routerHelper from "../helpers/routerHelper";
import newRecipe from "../controllers/recipes/newRecipe.controller";
import getRecipe from "../controllers/recipes/getRecipe.controller";
import getRecipes from "../controllers/recipes/getRecipes.controller";

const router = Router();

router.post("/create", routerHelper(newRecipe));
router.get("/recipe/:id", routerHelper(getRecipe));
router.post("/recipes", routerHelper(getRecipes));

export default router;
