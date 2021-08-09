import { Request, Response, NextFunction } from "express";
import getRecipesFromDB from "./functions/getRecipesFromDB";
import getRecipesFromApi from "./functions/getRecipesFromApi";
import filterByTypes from "./functions/filterByTypes";
import Cache from "./functions/Cache";
import Sort from "./functions/Sort";
import { Recipe } from "../../interfaces/Recipe";
import { Type } from "../../interfaces/Type";

interface Body {
  search?: string;
  filter?: string;
  sort?: string;
  order: string;
}

const cache = new Cache();

const getRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const NUMBER_OF_REQUEST_TO_THE_API: number = 8;
  const { search, filter, sort, order }: Body = req.body;
  let recipes: Recipe[] = [];

  const recipesFromDB: Recipe[] = await getRecipesFromDB();

  if (!cache.length()) {
    const apiData = (await getRecipesFromApi(
      NUMBER_OF_REQUEST_TO_THE_API
    )) as Recipe[];
    cache.modify(apiData);
  }

  const recipesFromApi: Recipe[] = cache.values();
  const allRecipes: Recipe[] = [...recipesFromDB, ...recipesFromApi];

  if (search && search.trim()) {
    const searchedRecipe: string = search.trim().toLocaleLowerCase();
    recipes = allRecipes.filter((e: Recipe) => {
      return e.name.toLocaleLowerCase().includes(searchedRecipe);
    });
  } else recipes = allRecipes;

  const searchByTypes = filter?.trim();
  if (searchByTypes !== undefined && searchByTypes && searchByTypes !== "all") {
    const recipesFilteredFromDB = await filterByTypes(searchByTypes);
    const recipesFilteredFromApi = recipesFromApi.filter((e: Recipe) =>
      (e.Types as Type[]).some((type: Type) => type.name === searchByTypes)
    );
    recipes = [...recipesFilteredFromDB, ...recipesFilteredFromApi];
  }

  if (sort && sort !== "default") {
    recipes =
      sort === "name"
        ? Sort.sortByRecipeName(recipes, order)
        : Sort.sortByPunctuation(recipes, order);
  }

  const data = {} as any;
  const page: string = req.query.page as string;
  const pageAsNumber: number = Number.parseInt(page);
  const LIMIT = 8;
  const totalRows: number = recipes.length;
  const totalPages: number = Math.ceil(totalRows / LIMIT);
  const startIndex: number = (pageAsNumber - 1) * LIMIT;
  const endIndex: number = pageAsNumber * LIMIT;
  data.totalPages = totalPages;

  if (endIndex < totalRows) data.next = { page: pageAsNumber + 1 };
  if (startIndex > 0) data.previous = { page: pageAsNumber - 1 };

  data.recipes = recipes.slice(startIndex, endIndex);

  return res.json(data);
};

export default getRecipes;
