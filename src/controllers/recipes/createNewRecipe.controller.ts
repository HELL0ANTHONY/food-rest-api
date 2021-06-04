import { Request, Response, NextFunction } from "express";
import { NewRecipeAttributes } from "../../interfaces/NewRecipeAttributes";
import Recipe from "../../models/Recipe";
import Type from "../../models/Type";
import RecipeTypes from "../../models/RecipeTypes";
import { v4 as uuidv4 } from 'uuid';
import findOrCreateTypes from "./findOrCreateTypes";

/**
 *
  recipeId: string;
  typeId: number;
  TODO: CONSEGUIR TANTO EL ID DEL RECIPE ASI COMO TAMBIEN TODOS LOS IDS DE TYPES QUE VAN A SER ASOCIADOS AL RECIPE
 */
async function createNewRecipe(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> {
  const id: string = uuidv4();
  const { types, ...recipeProperties }: NewRecipeAttributes = req.body;

  await Recipe.create({ id, ...recipeProperties });
  await findOrCreateTypes(types);
  const recipeTypeIds = await idOfTypes(types);

  // if (recipeTypeIds !== undefined) {
  //   const a = recipeTypeIds.map(type => RecipeTypes.create({
  //     recipeId: id,
  //     typeId: type.id
  //   }));
  // // }

  return res.json(recipeTypeIds);
  // return res.json({
  //   data: { id, ...recipeProperties, types }
  // });
}

async function idOfTypes(types: { name: string }[]) {
  const promiseOfIds = types.map(({ name }) => Type.findOne({
    where: {
      name: name.toLowerCase()
    },
    attributes: ["id"]
  }));
  return await Promise.all(promiseOfIds);
}

export default createNewRecipe;