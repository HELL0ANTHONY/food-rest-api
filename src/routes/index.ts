import { Router } from "express";
import types from "./types.routes";
const router = Router();

router.use("/pokemon", types);

export default router;
