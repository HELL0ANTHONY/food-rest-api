import { Request, Response, NextFunction } from "express";

type Helper = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | undefined>;

const routerHelper =
  (fn: Helper) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default routerHelper;
