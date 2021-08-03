import db from "../../../models";

const getRecipeByIdFromDB = async (id: string): Promise<object> => {
  return await db.Recipe.findByPk(id, {
    attributes: [
      "id",
      "name",
      "steps",
      "summary",
      "dishTypes",
      "punctuation",
      "healthScore"
    ],
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
