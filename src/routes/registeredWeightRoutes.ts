import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as registeredWeightServices from "../services/registeredWeightService";

export const registeredWeightRouter = express.Router();

registeredWeightRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registeredWeights =
        await registeredWeightServices.getAllRegisteredWeights();
      if (registeredWeights.length === 0) {
        return res.status(200).json({ message: "No registered weights" });
      } else if (registeredWeights.length >= 1) {
        return res.status(200).json(registeredWeights);
      } else throw new Error("Get all registered weights failed");
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredWeightRouter.get(
  "/petid/:petid",
  async (req: Request, res: Response, next: NextFunction) => {
    const { petId } = req.params;
    try {
      const registeredWeights =
        await registeredWeightServices.getAllRegisteredWeightsViaPetId(petId);
      if (registeredWeights.length === 0) {
        return res.status(200).json({
          message: `No registered weights with pet id:${petId}`,
        });
      } else if (registeredWeights.length >= 1) {
        return res.status(200).json(registeredWeights);
      } else
        throw new Error(
          `Get all registered weights with pet id:${petId} failed`
        );
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredWeightRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredWeight =
        await registeredWeightServices.getRegisteredWeightViaId(id);
      if (!registeredWeight) {
        return res
          .status(200)
          .json({ message: `No registered weight with id:${id}` });
      } else if (registeredWeight) {
        return res.status(200).json(registeredWeight);
      } else throw new Error(`Get registered weight with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredWeightRouter.post(
  "/:petid/:weightid",
  async (req: Request, res: Response, next: NextFunction) => {
    const registeredWeightData = {
      petId: req.params.petid,
      weightId: req.params.weightid,
    };
    try {
      const registeredWeight =
        await registeredWeightServices.createRegisteredWeight(
          registeredWeightData
        );
      if (!registeredWeight) {
        return res.status(200).json({ message: `No registered weight` });
      } else if (registeredWeight) {
        return res
          .status(200)
          .json({ message: `Registered weight successfully` });
      } else throw new Error(`Create registered weight failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredWeightRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredWeight =
        await registeredWeightServices.deleteRegisteredWeightViaId(id);
      if (!registeredWeight) {
        return res
          .status(200)
          .json({ message: `No registered weights with id:${id}` });
      } else if (registeredWeight) {
        return res.status(200).json(registeredWeight);
      } else throw new Error(`Delete registered weight with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
