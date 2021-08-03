import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.API_KEY;

export const baseURL = (id: number): string =>
  `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&addRecipeInformation=true`;
