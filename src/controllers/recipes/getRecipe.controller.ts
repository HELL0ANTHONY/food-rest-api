import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { baseURL } from "../../config/constants";
import getRecipeByIdFromDB from "./functions/getRecipeByIdFromDB";
import mapData from "../../helpers/mapData";

const isNumber = (n: any) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

const getRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const id: string = req.params.id;

  let recipe: object = {};
  if (isNumber(id)) {
    const idAsNumber: number = Number.parseInt(id);
    const apiRecipe = await axios.get<object>(baseURL(idAsNumber));
    recipe = mapData(apiRecipe?.data);
  } else {
    recipe = await getRecipeByIdFromDB(id);
  }

  return res.json(recipe);
};

export default getRecipe;
