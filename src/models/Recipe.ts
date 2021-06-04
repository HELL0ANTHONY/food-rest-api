import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";
import Type from "./Type";
interface RecipeAttributes {
  id: string;
  name: string;
  summary: string;
  punctuation?: number;
  healthScore?: number;
  steps?: string[];
}

// TODO: ANTES DE INGRESAR LOS DATOS A LA BASE DE DATOS SETTEARLOS PARA QUE TODO ESTE EN MINUSCULA Y SIN ESPACIOS

interface RecipeInstance
  extends Model<RecipeAttributes>,
  RecipeAttributes { }

const Recipe = sequelize.define<RecipeInstance>("recipe", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  healthScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1
  },
  steps: {
    type: DataTypes.ARRAY(DataTypes.STRING()),
    allowNull: true,
    defaultValue: ["Information no provided"]
  }
}, {
  timestamps: false
});

Recipe.belongsToMany(Type, { through: "RecipeTypes" });
Type.belongsToMany(Recipe, { through: "RecipeTypes" });

export default Recipe;