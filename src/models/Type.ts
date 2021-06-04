import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";

interface TypeAttributes {
  id: number;
  name: string;
}

interface TypeInstance
  extends Model<TypeAttributes>,
  TypeAttributes { }

const Type = sequelize.define<TypeInstance>("type", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Type;