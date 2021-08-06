import axios from "axios";
import { Request, Response, NextFunction } from "express";
import getRecipeByIdFromDB from "./functions/getRecipeByIdFromDB";
import { baseURL } from "../../config/constants";
import mapData from "../../helpers/mapData";
import { Recipe } from "../../interfaces/Recipe";

const isNumber = (n: any) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

let cache: Recipe[] = [];
const getRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const id: string = req.params.id;
  let recipe: object = {};

  if (cache.length && cache.some(e => e.id == id)) {
    recipe = Object.assign({}, ...cache.filter(recipe => recipe.id == id));
    return res.json(recipe);
  }

  if (isNumber(id)) {
    const idAsNumber: number = Number.parseInt(id);
    const apiRecipe = await axios.get<object>(baseURL(idAsNumber));
    recipe = Object.assign({}, ...mapData(apiRecipe?.data));
    cache.push(recipe as Recipe);
  } else {
    recipe = await getRecipeByIdFromDB(id);
    cache.push(recipe as Recipe);
  }

  return res.json(recipe);
};

export default getRecipe;
