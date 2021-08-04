import db from "../../../models";

const getRecipesFromDB = async () => {
  return await db.Recipe.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: {
      model: db.Type,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      through: { attributes: [] }
    }
  });
};

export default getRecipesFromDB;
