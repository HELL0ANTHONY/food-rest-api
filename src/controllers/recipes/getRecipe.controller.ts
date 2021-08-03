import { Request, Response, NextFunction } from "express";
import db from "../../models";

const getRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const id: string = req.params.id;

  const recipe: object = await db.Recipe.findByPk(id, {
    attributes: ["id", "name"],
    include: {
      model: db.Type,
      attributes: ["id", "name"],
      through: {
        attributes: []
      }
    }
  });

  return res.json(recipe);
};

export default getRecipe;
