import Type from "../../models/Type";

async function findOrCreateTypes(types: { name: string }[]) {
  const promisesOfTypes = types.map(({ name }) => Type.findOrCreate({
    where: {
      name: name.toLowerCase()
    }
  }));
  return await Promise.all(promisesOfTypes);
}

export default findOrCreateTypes;