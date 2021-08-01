import express from "express";
import db from "./models";
const app = express();
const port = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(() => {
    console.log(`Server listen on port ${port}`);
  });
});
