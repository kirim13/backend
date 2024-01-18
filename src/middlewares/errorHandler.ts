import { NextFunction, Request, Response } from "express";

const errorHandler = (
  //eslint-disable-next-line
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`ERROR ${err.message}`);
  const status = err.status || 400;
  res.status(status).send(err.message);
  next();
};

export default errorHandler;
