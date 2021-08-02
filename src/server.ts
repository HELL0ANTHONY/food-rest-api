import { Request, Response, NextFunction } from "express";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import logging from "./helpers/logging";

const NAMESPACE = "Server";
const router = express();

router.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(
    NAMESPACE,
    `METHOD [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}] STATUS - [${res.status}]`
    );
  });

  next();
});

router.use(helmet());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cookieParser());
router.use(morgan("dev"));
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200);
  }
  next();
});

// router.use("/", routes);
router.disable("etag");

router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  return res.status(404).json({
    message: error.message
  });
});

export default router;
