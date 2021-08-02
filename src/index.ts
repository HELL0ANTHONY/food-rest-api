import http from "http";
import server from "./server";
import config from "./config";
import db from "./models";
import logging from "./helpers/logging";

const NAMESPACE = "Index";
const httpServer = http.createServer(server);

db.sequelize.sync().then(() => {
  httpServer.listen(config.server.port, () =>
    logging.info(
      NAMESPACE,
      `Server running on ${config.server.hostname}:${config.server.port}`
    )
  );
});
