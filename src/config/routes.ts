import { type Express } from "express";
import { userRouter } from "../routes/Users/userRoutes";
import { petRouter } from "../routes/Pets/petRoutes";
import { notificationRouter } from "../routes/Notifications/notificationRoutes";
import { notificationDetailRouter } from "../routes/Notifications/notificationDetailRoutes";
import { notificationScheduleRouter } from "../routes/Notifications/notificationScheduleRoutes";
import { registeredNotificationRouter } from "../routes/Notifications/registeredNotificationRoutes";
import { financeRouter } from "../routes/Finances/financeRoutes";
import { registeredFinanceRouter } from "../routes/Finances/registeredFinanceRoutes";
import { recordRouter } from "../routes/Records/recordRoutes";
import { weightRouter } from "../routes/Weight/weightRoutes";
import { registeredWeightRouter } from "../routes/Weight/registeredWeightRoutes";
import { itemRouter } from "../routes/Inventory/itemRoutes";

export default (app: Express): void => {
  app.use("/users", userRouter);
  app.use("/pets", petRouter);
  app.use("/notifications", notificationRouter);
  app.use("/notificationDetails", notificationDetailRouter);
  app.use("/notificationSchedule", notificationScheduleRouter);
  app.use("/registeredNotifications", registeredNotificationRouter);
  app.use("/finances", financeRouter);
  app.use("/registeredFinances", registeredFinanceRouter);
  app.use("/records", recordRouter);
  app.use("/weights", weightRouter);
  app.use("/registeredWeights", registeredWeightRouter);
  app.use("/items", itemRouter);
};