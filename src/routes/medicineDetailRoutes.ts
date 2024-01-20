import express from "express";
import type { NextFunction, Request, Response } from "express";

import * as medicineDetailServices from "../services/medicineDetailService";

export const medicineDetailRouter = express.Router();

medicineDetailRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medicines = await medicineDetailServices.getAllMedicineDetails();

      if (medicines.length === 0) {
        return res.status(400).json({ error: "No registered medicines" });
      } else if (medicines) {
        return res.status(200).json(medicines);
      } else
        return res.status(400).json({ error: "Failed to get all medicines" });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineDetailRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const medicine = await medicineDetailServices.getMedicineDetails(id);
      if (medicine) {
        return res.status(200).json(medicine);
      }
      return res
        .status(400)
        .json({ error: `Failed to get medicine with id:${id}` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineDetailRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const medicineData = req.body;
    try {
      const medicine = await medicineDetailServices.createMedicineDetails(
        medicineData
      );
      if (medicine) {
        return res
          .status(200)
          .json({ message: `Successfully created medicine` });
      }
      return res.status(400).json({ error: `Failed to create medicine` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineDetailRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const medicineData = req.body;
    try {
      const medicine = await medicineDetailServices.updateMedicineDetails(
        id,
        medicineData
      );
      if (medicine) {
        return res
          .status(200)
          .json({ message: `Successfully updated medicine with id:${id}` });
      }
      return res
        .status(400)
        .json({ error: `Failed to updated medicine with id:${id}` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineDetailRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const medicine = await medicineDetailServices.deleteMedicineDetails(id);
      if (medicine) {
        return res
          .status(200)
          .json({ message: `Successfully deleted medicine with id:${id}` });
      }
      return res
        .status(400)
        .json({ error: `Failed to get medicine with id:${id}` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
