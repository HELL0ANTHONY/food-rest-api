import { Request, Response, NextFunction } from "express";

const getTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  return res.json({ message: "Ok, is working" });
};

export default getTypes;
