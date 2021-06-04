import { Router } from "express";
import routerHelper from "../helpers/routerHelper";

import createNewRecipe from "../controllers/createNewRecipe.controller";
const router = Router();

router.post('/recipe', routerHelper(createNewRecipe));

export default router;