import { NextFunction, Request, Response } from "express";
import { MiddlewareProtocol } from "../../../presetation/controllers/@shared/MiddlewareProtocol";

export const middlewareAdapter = (middleware: MiddlewareProtocol) => {
  return async (req: Request, res: Response, next: NextFunction) =>
    middleware.execute(req, res, next);
};
