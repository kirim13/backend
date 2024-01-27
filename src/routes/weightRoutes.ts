import express, { NextFunction, Request, Response } from "express";
import * as weightServices from "../services/weightService";

export const weightRouter = express.Router();

weightRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const weightData = req.body;
    try {
      const weight = await weightServices.addWeight(weightData);
      if (weight) {
        res.status(200).json({ message: "Added weight successfully" });
      }
      throw new Error(`Add new weight failed`);
    } catch (err) {
      next(err);
    }
  }
);

weightRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const weights = await weightServices.getAllWeights();
      if (weights.length === 0) {
        res.status(200).json({ message: "No weights added" });
      } else if (weights) {
        res.status(200).json({ weights });
      }
      throw new Error(`Get all weights failed`);
    } catch (err) {
      next(err);
    }
  }
);

weightRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const weight = await weightServices.getWeight(id);
      if (weight) {
        res.status(200).json({ weight });
      }
      throw new Error(`Get weight with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

weightRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const weightData = req.body;
    const { id } = req.params;
    try {
      const weight = await weightServices.updateWeight(id, weightData);
      if (weight) {
        res
          .status(200)
          .json({ message: `Update weight with id:${id} successfully` });
      }
      throw new Error(`Update weight with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

weightRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const weight = await weightServices.deleteWeight(id);
      if (weight) {
        res.status(200).json({ message: `Delete weight with id:${id} failed` });
      }
      throw new Error(`Delete weight with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);
