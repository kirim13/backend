import express, { NextFunction, Request, Response } from "express";
import * as inventoryServices from "../../services/Inventory/inventoryService";

export const inventoryRouter = express.Router();

inventoryRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const inventoryData = req.body;
    if (!inventoryData) throw new Error("Inventory data required");
    try {
      const Inventory = await inventoryServices.createInventory(inventoryData);
      if (Inventory) {
        res.status(200).json(`Create Inventory successfully`);
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
      const items = await inventoryServices.getAllInventory();
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
      const Inventory = await inventoryServices.getInventory(id);
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

inventoryRouter.get(
  "/item/:itemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { itemId } = req.params;
    if (!itemId) throw new Error("Item id data required");
    try {
      const Inventory = await inventoryServices.getAllInventoryViaItemId(
        itemId
      );
      let quantity = 0;
      Inventory.forEach((item) => {
        quantity += item.quantity;
      });
      if (!Inventory) {
        res.status(400).json(`Get Inventory with item id:${itemId} failed`);
      } else if (Inventory) {
        console.log(`Total quantity:${quantity} for item id:${itemId}`);
        res.status(200).json(Inventory);
      } else throw new Error(`Get Inventory with item id:${itemId} failed`);
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
      const Inventory = await inventoryServices.updateInventory(
        id,
        inventoryData
      );
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
      const Inventory = await inventoryServices.deleteInventory(id);
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
