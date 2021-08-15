import { Router } from "express";
import routerHelper from "../helpers/routerHelper";
import newRecipe from "../controllers/recipes/newRecipe.controller";
import getRecipe from "../controllers/recipes/getRecipe.controller";
import getRecipes from "../controllers/recipes/getRecipes.controller";

import validation from "../middleware/validation";
import newRecipeSchema from "../validations/newRecipeValidations";

const router = Router();

router.post("/create", validation(newRecipeSchema), routerHelper(newRecipe));
router.get("/recipe/:id", routerHelper(getRecipe));
router.post("/recipes", routerHelper(getRecipes));

export default router;
