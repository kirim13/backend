import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as registeredMedicineServices from "../services/registeredMedicineService";

export const registeredMedicineRouter = express.Router();

registeredMedicineRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const registeredMedicines =
      registeredMedicineServices.getAllRegisteredMedicines();
    try {
      res.status(200).json(registeredMedicines);
    } catch (err) {
      next(err);
    }
  }
);
