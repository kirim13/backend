import { type Express } from "express";
import { userRouter } from "../routes/Users/userRoutes";
import { petRouter } from "../routes/Pets/petRoutes";
import { notificationRouter } from "../routes/Notifications/notificationRoutes";
import { financeRouter } from "../routes/Finances/financeRoutes";
import { registeredFinanceRouter } from "../routes/Finances/registeredFinanceRoutes";
import { recordRouter } from "../routes/Records/recordRoutes";
import { weightRouter } from "../routes/Weight/weightRoutes";
import { registeredWeightRouter } from "../routes/Weight/registeredWeightRoutes";
import { itemRouter } from "../routes/Inventory/itemRoutes";
import { inventoryRouter } from "../routes/Inventory/inventoryRoutes";
import { registeredInventoryRouter } from "../routes/Inventory/registeredInventoryRoutes";
import { relationshipRouter } from "../routes/Users/relationshipRoutes";

export default (app: Express): void => {
  app.use("/users", userRouter);
  app.use("/pets", petRouter);
  app.use("/notifications", notificationRouter);
  app.use("/finances", financeRouter);
  app.use("/registeredFinances", registeredFinanceRouter);
  app.use("/records", recordRouter);
  app.use("/weights", weightRouter);
  app.use("/registeredWeights", registeredWeightRouter);
  app.use("/items", itemRouter);
  app.use("/inventory", inventoryRouter);
  app.use("/registeredInventory", registeredInventoryRouter);
  app.use("/relationships", relationshipRouter);
};
