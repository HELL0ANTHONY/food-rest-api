"use strict";
import { Model, UUIDV4 } from "sequelize";

interface RecipeAttributes {
  id: string;
  name: string;
  resume: string;
  punctuation: number | null;
  healthScore: number | null;
  steps: string[] | null;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Recipe extends Model<RecipeAttributes> implements RecipeAttributes {
    id!: string;
    name!: string;
    resume!: string;
    punctuation!: number;
    healthScore!: number;
    steps!: string[];

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
      resume: {
        type: DataTypes.STRING,
        allowNull: false
      },
      punctuation: {
        type: DataTypes.INTEGER
      },
      healthScore: {
        type: DataTypes.INTEGER
      },
      steps: {
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
