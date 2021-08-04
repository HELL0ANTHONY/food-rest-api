export interface Recipe {
  id: string | number;
  name: string;
  image?: string;
  summary: string;
  types: object[];
  dishTypes: string[];
  healthScore: number;
  steps: string[];
}
