"use strict";

import { Model } from "sequelize";

interface TypeAttributes {
  id?: string;
  name?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Type extends Model<TypeAttributes> implements TypeAttributes {
    id!: string;
    name!: string;

    static associate(models: any) {
      Type.belongsToMany(models.Recipe, {
        through: "recipeTypes"
      });
    }
  }
  Type.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      modelName: "Recipe"
    }
  );
  return Type;
};
