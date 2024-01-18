import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} url:${req.url}`);
  next();
};

export default loggerMiddleware;
