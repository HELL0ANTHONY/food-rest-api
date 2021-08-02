import { Request, Response, NextFunction } from "express";
import db from "../models";

const getTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const types = await db.Type.findAll({ attributes: ["id", "name"] });
  return res.json(types);
};

export default getTypes;
