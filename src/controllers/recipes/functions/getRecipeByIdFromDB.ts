import db from "../../../models";

const getRecipeByIdFromDB = async (id: string): Promise<object> => {
  return await db.Recipe.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: {
      attributes: ["id", "name"],
      model: db.Type,
      through: {
        attributes: []
      }
    }
  });
};

export default getRecipeByIdFromDB;
