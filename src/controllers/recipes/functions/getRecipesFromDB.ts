import db from "../../../models";
import { Recipe } from "../../../interfaces/Recipe";

const getRecipesFromDB = async (): Promise<Recipe[]> => {
  return await db.Recipe.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: {
      model: db.Type,
      attributes: ["name"],
      through: { attributes: [] }
    }
  }).then((recipes: Array<object>) => {
    return recipes.map((recipe: any) => recipe.dataValues);
  });
};

export default getRecipesFromDB;
