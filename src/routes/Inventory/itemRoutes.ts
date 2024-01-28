import express, { NextFunction, Request, Response } from "express";
import * as itemServices from "../../services/Inventory/itemService";

export const itemRouter = express.Router();

itemRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const itemData = req.body;
    if (!itemData) throw new Error("Item data required");
    try {
      const item = await itemServices.createItem(itemData);
      if (item) {
        res.status(200).json(`Create item ${itemData.type} successfully`);
      } else throw new Error("Create item failed");
    } catch (err) {
      next(err);
    }
  }
);

itemRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await itemServices.getAllItems();
    if (!items) {
      res.status(400).json("No items found");
    } else if (items) {
      res.status(200).json(items);
    } else throw new Error("Get all items failed");
  } catch (err) {
    next(err);
  }
});

itemRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) throw new Error("Id data required");
    try {
      const item = await itemServices.getItem(id);
      if (!item) {
        res.status(400).json(`Get item with id:${id} failed`);
      } else if (item) {
        res.status(200).json(item);
      } else throw new Error(`Get item with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

itemRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const itemData = req.body;
    const { id } = req.params;
    if (!id) throw new Error("Id data required");
    if (!itemData) throw new Error("Item data required");
    try {
      const item = await itemServices.updateItem(id, itemData);
      if (!item) {
        res.status(400).json(`Update item with id:${id} failed`);
      } else if (item) {
        res.status(200).json(`Update item ${itemData.type} successfully`);
      } else throw new Error(`Update item with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

itemRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) throw new Error("Id data required");
    try {
      const item = await itemServices.deleteItem(id);
      if (!item) {
        res.status(400).json(`Delete item with id:${id} failed`);
      } else if (item) {
        res.status(200).json(`Delete item with id:${id} successfully`);
      } else throw new Error(`Delete item with id:${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);
