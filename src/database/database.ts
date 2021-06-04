import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

export default sequelize;