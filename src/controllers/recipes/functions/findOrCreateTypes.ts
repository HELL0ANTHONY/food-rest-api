import db from "../../../models";
import { Type } from "../../../interfaces/Type";

const findOrCreateTypes = async (types: Type[]): Promise<Type[]> => {
  const promises: Iterable<unknown[]> = types.map(({ name }: Type) =>
    db.Type.findOrCreate({ where: { name } })
  );
  const promiseResults: unknown[][] = await Promise.all(promises);
  return promiseResults.flat().filter(e => typeof e !== "boolean") as Type[];
};

export default findOrCreateTypes;
