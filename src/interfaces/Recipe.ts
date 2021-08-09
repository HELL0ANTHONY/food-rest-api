export interface Recipe {
  id: string | number;
  name: string;
  image?: string;
  summary: string;
  punctuation: number;
  Types: object[];
  dishTypes?: string[];
  healthScore?: number;
  steps?: string[];
}
