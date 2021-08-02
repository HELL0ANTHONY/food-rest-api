import db from "../models";
import types from "./types";

async function chargePokemonTypes(): Promise<void> {
  const count = await db.Type.count();
  if (!count) await db.Type.bulkCreate(types);
}

export default chargePokemonTypes;
