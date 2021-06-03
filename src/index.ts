// import db from "./database/database";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;

// db.connection.sync({ force: true })
  // .then((): void => {
  //   app.listen(PORT, (): void => {
  //     console.log("server running on PORT:", PORT);
  //   });
  // });
  app.listen(PORT, () => {
    console.log("server running on PORT:", PORT);
  });
