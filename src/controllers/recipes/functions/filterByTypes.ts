import { Op } from "sequelize";
import db from "../../../models";
import { Recipe } from "../../../interfaces/Recipe";
interface Id {
  id: string;
}

const filterByTypes = async (typeName: string): Promise<Recipe[]> => {
  return await db.Recipe.findAll({
    attributes: ["id"],
    include: [
      {
        where: { name: typeName },
        model: db.Type,
        attributes: [],
        through: {
          attributes: []
        }
      }
    ]
  }).then(async (recipesId: any[]) => {
    const ids: string[] = recipesId.map(
      (recipesId: any) => recipesId.dataValues.id
    );

    return await db.Recipe.findAll({
      where: { id: ids },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: {
        model: db.Type,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    });
  });
};

export default filterByTypes;
