import { Request, Response, NextFunction } from "express";

const routerHelper =
  (func: any) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      return await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default routerHelper;
