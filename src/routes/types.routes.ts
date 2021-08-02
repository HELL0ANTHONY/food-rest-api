import { Router } from "express";
import routerHelper from "../helpers/routerHelper";
import getTypes from "../controllers/getTypes.controller";

const router = Router();

router.get("/types", routerHelper(getTypes));

export default router;
