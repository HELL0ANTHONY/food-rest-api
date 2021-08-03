import db from "../models";
import types from "./types";

async function chargeRecipeTypes(): Promise<void> {
  const count = await db.Type.count();
  if (!count) await db.Type.bulkCreate(types);
}

export default chargeRecipeTypes;
