import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as registeredInventoryServices from "../../services/Inventory/registeredInventoryService";

export const registeredInventoryRouter = express.Router();

registeredInventoryRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registeredInventory =
        await registeredInventoryServices.getAllRegisteredInventory();
      if (registeredInventory.length === 0) {
        return res.status(200).json({ message: "No registered inventory" });
      } else if (registeredInventory.length >= 1) {
        return res.status(200).json(registeredInventory);
      } else throw new Error("Get all registered inventory failed");
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredInventoryRouter.get(
  "/petid/:petid",
  async (req: Request, res: Response, next: NextFunction) => {
    const { petId } = req.params;
    try {
      const registeredInventory =
        await registeredInventoryServices.getAllRegisteredInventoryViaPetId(
          petId
        );
      if (registeredInventory.length === 0) {
        return res.status(200).json({
          message: `No registered inventory with pet id:${petId}`,
        });
      } else if (registeredInventory.length >= 1) {
        return res.status(200).json(registeredInventory);
      } else
        throw new Error(
          `Get all registered inventory with pet id:${petId} failed`
        );
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredInventoryRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredInventory =
        await registeredInventoryServices.getRegisteredInventoryViaId(id);
      if (!registeredInventory) {
        return res
          .status(200)
          .json({ message: `No registered inventory with id:${id}` });
      } else if (registeredInventory) {
        return res.status(200).json(registeredInventory);
      } else throw new Error(`Get registered inventory with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredInventoryRouter.post(
  "/:petid/:inventoryid",
  async (req: Request, res: Response, next: NextFunction) => {
    const registeredInventoryData = {
      petId: req.params.petid,
      inventoryId: req.params.inventoryid,
    };
    try {
      const registeredInventory =
        await registeredInventoryServices.createRegisteredInventory(
          registeredInventoryData
        );
      if (!registeredInventory) {
        return res.status(200).json({ message: `No registered inventory` });
      } else if (registeredInventory) {
        return res
          .status(200)
          .json({ message: `Registered inventory successfully` });
      } else throw new Error(`Create registered inventory failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredInventoryRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredInventory =
        await registeredInventoryServices.deleteRegisteredInventoryViaId(id);
      if (!registeredInventory) {
        return res
          .status(200)
          .json({ message: `No registered inventory with id:${id}` });
      } else if (registeredInventory) {
        return res.status(200).json(registeredInventory);
      } else
        throw new Error(`Delete registered inventory with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
