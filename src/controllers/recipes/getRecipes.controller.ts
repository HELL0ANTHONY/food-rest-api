import { Request, Response, NextFunction } from "express";
import getRecipesFromDB from "./functions/getRecipesFromDB";
import getRecipesFromApi from "./functions/getRecipesFromApi";

const getRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const page: string = req.query.page as string;
  const pageAsNumber = Number.parseInt(page);
  const recipesFromDB = await getRecipesFromDB();
  const recipesFromApi = await getRecipesFromApi(3);

  return res.json(recipesFromApi);
};

export default getRecipes;
