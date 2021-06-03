import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST
} = process.env;

const sequelize: any = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native : false,
  });

const basename = path.basename(__filename);
const modelDefiners: any[] = [];

fs.readdirSync(path.join(__dirname, '../models'))
  .filter((file) =>
    (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.ts')) // maybe should are ".js"
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '../models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries
  .map((entry) => [entry[0][0]
    .toUpperCase() + entry[0].slice(1),
  entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Recipe } = sequelize.models;
// my models go here

const db = {
  ...sequelize.models,
  connection: sequelize
};

export default db;