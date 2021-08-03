import db from "../../../models";

interface Type {
  name: string;
}

const findOrCreateTypes = async (types: Type[]): Promise<unknown[]> => {
  const promises: Iterable<unknown[]> = types.map(({ name }: Type) =>
    db.Type.findOrCreate({ where: { name } })
  );
  const promiseResults: unknown[][] = await Promise.all(promises);
  return promiseResults.flat().filter(e => typeof e !== "boolean");
};

export default findOrCreateTypes;
