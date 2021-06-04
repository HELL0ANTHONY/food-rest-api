import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";

interface RecipeTypesAttributes {
  recipeId: string;
  typeId: number;
}

interface RecipeTypesInstance
  extends Model<RecipeTypesAttributes>,
  RecipeTypesAttributes { }

const RecipeTypes = sequelize.define<RecipeTypesInstance>("RecipeTypes", {
  recipeId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "recipes",
      key: "id"
    }
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "types",
      key: "id"
    }
  }
});

export default RecipeTypes;
