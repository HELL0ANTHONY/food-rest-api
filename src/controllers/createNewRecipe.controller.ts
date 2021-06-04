import { Request, Response, NextFunction } from "express";
import { NewRecipeAttributes } from "../interfaces/NewRecipeAttributes";
import Recipe from "../models/Recipe";
import Type from "../models/Type";
import { v4 as uuidv4 } from 'uuid';

async function createNewRecipe(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> {
  const id: string = uuidv4();
  const { types, ...recipeProperties }: NewRecipeAttributes = req.body;

  const recipeTypes = types.map(({ name }) => Type.findOrCreate({
    where: { name }
  }));
  await Promise.all(recipeTypes)
  const newRecipe = await Recipe.create({ id, ...recipeProperties });

  return res.json({
    data: { id, ...recipeProperties, types }
  });
}

export default createNewRecipe;