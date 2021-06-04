import { Request, Response, NextFunction } from "express";

function routerHelper(fn: Function) {
  return async function (req: Request, res:Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
export default routerHelper;