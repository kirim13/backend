import { type Express } from "express";
import { cors, logger } from "../middlewares/index";

export default (app: Express): void => {
  app.use(cors);
  app.use(logger);
};
