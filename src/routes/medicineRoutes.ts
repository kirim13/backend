import express from "express";
import type { NextFunction, Request, Response } from "express";

import * as medicineService from "../services/medicineService";

export const medicineRouter = express.Router();

// GET: List Medicines
medicineRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medicines = await medicineService.listMedicines();
      return res.status(200).json(medicines);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// GET: List Medicine via ID
medicineRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const medicine = await medicineService.getMedicine(id);
      if (medicine) {
        return res.status(200).json(medicine);
      }
      throw new Error(`Cannot find medicine with id:${id}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// POST: Create Medicine
medicineRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdMedicine = await medicineService.createMedicine(req.body);
      return res.status(200).json(createdMedicine);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT: Update Medicine via ID
medicineRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const medicine = req.body;
    if (!medicine.petId) {
      throw new Error(`Cannot find pet with id:${medicine.petId}`);
    }
    try {
      const updatedMedicine = await medicineService.updateMedicine(
        id,
        medicine
      );
      if (updatedMedicine) {
        return res
          .status(200)
          .json(`Update medicine ${updatedMedicine.name} successfully`);
      }
      throw new Error(`Update medicine ${medicine.name} failed`);
      //eslint-disable-next-line
    } catch (err) {
      next(err);
    }
  }
);

// Delete: Delete Medicine via ID
medicineRouter.delete(
  ":/id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const deletedMedicine = await medicineService.deleteMedicine(id);
      if (deletedMedicine) {
        return res
          .status(200)
          .json(`Deleted medicine ${deletedMedicine.name} successfully`);
      }
      throw new Error(`Delete medicine with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
