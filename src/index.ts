import sequelize from "./database/database";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: true })
  .then((): void => {
    app.listen(PORT, (): void => {
      console.log("server running on PORT:", PORT);
    });
  });