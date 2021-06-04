
export interface NewRecipeAttributes {
  types: { name: string }[];
  name: string;
  summary: string;
  punctuation?: number;
  healthScore?: number;
  steps?: string[];
}