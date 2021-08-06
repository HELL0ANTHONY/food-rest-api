import { Recipe } from "../../../interfaces/Recipe";
interface V {
  name: string;
}

function compare(f: V, s: V): number {
  const a = f.name.toLowerCase();
  const b = s.name.toLowerCase();
  return a < b ? -1 : a > b ? 1 : 0;
}

class Sort {
  static sortByRecipeName(array: Recipe[], order: string): Recipe[] {
    return order === "asc"
      ? array.sort(compare)
      : array.sort((a, b) => compare(b, a));
  }
}

export default Sort;
