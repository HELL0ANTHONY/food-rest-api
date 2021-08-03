import db from "../../../models";

const getRecipeByIdFromDB = async (id: string): Promise<object> => {
  return await db.Recipe.findByPk(id, {
    attributes: ["id", "name", "resume", "punctuation", "healthScore", "steps"],
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
