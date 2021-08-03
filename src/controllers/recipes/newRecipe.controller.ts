import { Request, Response, NextFunction } from "express";
import findOrCreateTypes from "./functions/findOrCreateTypes";
import db from "../../models";

const newRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { types, ...recipe } = req.body;
  const newRecipe = await db.Recipe.create(recipe);
  const foodTypes = await findOrCreateTypes(types);
  const recipeWithTypes = await newRecipe.addTypes(foodTypes);
  return res.json(recipeWithTypes);
};

export default newRecipe;
