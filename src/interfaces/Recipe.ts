export interface Recipe {
  id: string | number;
  name: string;
  image?: string;
  summary: string;
  Types: object[];
  dishTypes?: string[];
  healthScore?: number;
  steps?: string[];
}
