import { Request, Response, NextFunction } from "express";
import getRecipesFromDB from "./functions/getRecipesFromDB";
import getRecipesFromApi from "./functions/getRecipesFromApi";
import filterByTypes from "./functions/filterByTypes";
import Sort from "./functions/Sort";
import { Recipe } from "../../interfaces/Recipe";
import { Type } from "../../interfaces/Type";

interface Body {
  search?: string;
  filter?: string;
  sort?: string;
  order: string;
}
interface T {
  name: string;
}

const getRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const page: string = req.query.page as string;
  const pageAsNumber: number = Number.parseInt(page);
  const NUMBER_OF_REQUEST_TO_THE_API: number = 2;
  const { search, filter, sort, order }: Body = req.body;
  let recipes: Recipe[] = [];

  const recipesFromDB = await getRecipesFromDB();
  const recipesFromApi: Recipe[] = (await getRecipesFromApi(
    NUMBER_OF_REQUEST_TO_THE_API
  )) as Recipe[];

  const allRecipes: Recipe[] = [...recipesFromDB, ...recipesFromApi];

  if (search && search.trim()) {
    const searchedRecipe = search.trim().toLocaleLowerCase();
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
      sort === "name" ? Sort.sortByRecipeName(allRecipes, order) : allRecipes;
  }

  return res.json(recipes);
};

export default getRecipes;
