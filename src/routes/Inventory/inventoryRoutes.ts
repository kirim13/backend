import express, { NextFunction, Request, Response } from "express";
import * as inventoryServices from "../../services/Inventory/itemService";

export const inventoryRouter = express.Router();

inventoryRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const inventoryData = req.body;
    if (!inventoryData) throw new Error("Inventory data required");
    try {
      const Inventory = await inventoryServices.createItem(inventoryData);
      if (Inventory) {
        res
          .status(200)
          .json(`Create Inventory ${inventoryData.type} successfully`);
      } else throw new Error("Create Inventory failed");
    } catch (err) {
      next(err);
    }
  }
);

inventoryRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await inventoryServices.getAllItems();
      if (!items) {
        res.status(400).json("No items found");
      } else if (items) {
        res.status(200).json(items);
      } else throw new Error("Get all items failed");
    } catch (err) {
      next(err);
    }
  }
);

inventoryRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) throw new Error("Id data required");
    try {
      const Inventory = await inventoryServices.getItem(id);
      if (!Inventory) {
        res.status(400).json(`Get Inventory with id:${id} failed`);
      } else if (Inventory) {
        res.status(200).json(Inventory);
      } else throw new Error(`Get Inventory with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

inventoryRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const inventoryData = req.body;
    const { id } = req.params;
    if (!id) throw new Error("Id data required");
    if (!inventoryData) throw new Error("Inventory data required");
    try {
      const Inventory = await inventoryServices.updateItem(id, inventoryData);
      if (!Inventory) {
        res.status(400).json(`Update Inventory with id:${id} failed`);
      } else if (Inventory) {
        res
          .status(200)
          .json(`Update Inventory ${inventoryData.type} successfully`);
      } else throw new Error(`Update Inventory with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

inventoryRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) throw new Error("Id data required");
    try {
      const Inventory = await inventoryServices.deleteItem(id);
      if (!Inventory) {
        res.status(400).json(`Delete Inventory with id:${id} failed`);
      } else if (Inventory) {
        res.status(200).json(`Delete Inventory with id:${id} successfully`);
      } else throw new Error(`Delete Inventory with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);
