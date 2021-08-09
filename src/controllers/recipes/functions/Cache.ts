import { Recipe } from "../../../interfaces/Recipe";

class Cache {
  private data: Array<Recipe>;
  constructor(value = []) {
    this.data = value;
  }

  length(): number {
    return this.data.length;
  }

  modify(newValues: any) {
    // if (this.data === newValues) return;
    this.data = newValues;
  }

  values(): Array<Recipe> {
    return this.data;
  }
}

export default Cache;
