import { type Express } from "express";
import { userRouter } from "../routes/userRoutes";
import { petRouter } from "../routes/petRoutes";
import { notificationRouter } from "../routes/notificationRoutes";
import { notificationDetailRouter } from "../routes/notificationDetailRoutes";
import { notificationScheduleRouter } from "../routes/notificationScheduleRoutes";
import { registeredNotificationRouter } from "../routes/registeredNotificationRoutes";
import { financeRouter } from "../routes/financeRoutes";
import { registeredFinanceRouter } from "../routes/registeredFinanceRoutes";
import { recordRouter } from "../routes/recordRoutes";
import { weightRouter } from "../routes/weightRoutes";
import { registeredWeightRouter } from "../routes/registeredWeightRoutes";

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
};
