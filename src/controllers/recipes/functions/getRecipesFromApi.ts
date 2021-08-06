import axios from "axios";
import { baseURL } from "../../../config/constants";
import mapData from "../../../helpers/mapData";

interface R {
  status: string;
  value: object;
}

const requestToApi = async (url: string): Promise<object> => {
  return await axios.get(url).then(res => res.data);
};

const getRecipesFromApi = async (size: number): Promise<object[]> => {
  const promiseRecipes: Promise<object>[] = [...Array(size + 1).keys()]
    .slice(1)
    .map(id => requestToApi(baseURL(id)));
  const resolveRecipes = await Promise.allSettled(promiseRecipes);
  const recipesFullfilled = resolveRecipes.filter(
    ({ status }) => status !== "rejected"
  ) as R[];
  return mapData(recipesFullfilled.map(e => e.value));
};

export default getRecipesFromApi;
