"use strict";
import { Model, UUIDV4 } from "sequelize";

interface RecipeAttributes {
  id: string;
  name: string;
  summary: string;
  dishTypes: string[] | null;
  punctuation: number | null;
  healthScore: number | null;
  steps: string[] | null;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Recipe extends Model<RecipeAttributes> implements RecipeAttributes {
    id!: string;
    name!: string;
    summary!: string;
    punctuation!: number;
    healthScore!: number;
    steps!: string[];
    dishTypes!: string[];

    static associate(models: any) {
      Recipe.belongsToMany(models.Type, {
        through: "recipeTypes"
      });
    }
  }
  Recipe.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false
      },
      punctuation: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      healthScore: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      dishTypes: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
    },
    {
      sequelize,
      modelName: "Recipe"
    }
  );
  return Recipe;
};
