import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as registeredMedicineServices from "../services/registeredMedicineService";

export const registeredMedicineRouter = express.Router();

registeredMedicineRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registeredMedicines =
        await registeredMedicineServices.getAllRegisteredMedicines();
      if (registeredMedicines.length === 0) {
        return res.status(200).json({ message: "No registered medicines" });
      } else if (registeredMedicines.length >= 1) {
        return res.status(200).json(registeredMedicines);
      } else throw new Error("Get all registered medicines failed");
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredMedicineRouter.get(
  "/:petid",
  async (req: Request, res: Response, next: NextFunction) => {
    const { petId } = req.params;
    try {
      const registeredMedicines =
        await registeredMedicineServices.getAllRegisteredMedicinesViaPetId(
          petId
        );
      if (registeredMedicines.length === 0) {
        return res
          .status(200)
          .json({ message: `No registered medicines with pet id:${petId}` });
      } else if (registeredMedicines.length > 1) {
        return res.status(200).json(registeredMedicines);
      } else
        throw new Error(
          `Get all registered medicines with pet id:${petId} failed`
        );
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredMedicineRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredMedicine =
        await registeredMedicineServices.getRegisteredMedicineViaId(id);
      if (!registeredMedicine) {
        return res
          .status(200)
          .json({ message: `No registered medicines with id:${id}` });
      } else if (registeredMedicine) {
        return res.status(200).json(registeredMedicine);
      } else throw new Error(`Get registered medicine with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredMedicineRouter.get(
  "/:petid",
  async (req: Request, res: Response, next: NextFunction) => {
    const { petId } = req.params;
    try {
      const registeredMedicine =
        await registeredMedicineServices.getRegisteredMedicineViaPetId(petId);
      if (!registeredMedicine) {
        return res
          .status(200)
          .json({ message: `No registered medicine with pet id:${petId}` });
      } else if (registeredMedicine) {
        return res.status(200).json(registeredMedicine);
      } else
        throw new Error(`Get registered medicine with pet id:${petId} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredMedicineRouter.post(
  "/:petid/:medicinenotifid",
  async (req: Request, res: Response, next: NextFunction) => {
    const registeredMedicineData = {
      petId: req.params.petid,
      medicinenotifid: req.params.medicinenotifid,
    };
    try {
      const registeredMedicine =
        await registeredMedicineServices.createRegisteredMedicine(
          registeredMedicineData
        );
      if (!registeredMedicine) {
        return res.status(200).json({ message: `No registered medicine` });
      } else if (registeredMedicine) {
        return res
          .status(200)
          .json({ message: `Registered medicine successfully` });
      } else throw new Error(`Create registered medicine failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredMedicineRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredMedicine =
        await registeredMedicineServices.deleteRegisteredMedicineViaId(id);
      if (!registeredMedicine) {
        return res
          .status(200)
          .json({ message: `No registered medicines with id:${id}` });
      } else if (registeredMedicine) {
        return res.status(200).json(registeredMedicine);
      } else throw new Error(`Delete registered medicine with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredMedicineRouter.delete(
  "/:petid",
  async (req: Request, res: Response, next: NextFunction) => {
    const { petId } = req.params;
    try {
      const registeredMedicine =
        await registeredMedicineServices.deleteRegisteredMedicineViaPetId(
          petId
        );
      if (!registeredMedicine) {
        return res
          .status(200)
          .json({ message: `No registered medicine with pet id:${petId}` });
      } else if (registeredMedicine) {
        return res.status(200).json(registeredMedicine);
      } else
        throw new Error(
          `Delete registered medicine with pet id:${petId} failed`
        );
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
