import "dotenv/config";
import express from "express";
import corsMiddleware from "./middlewares/cors";
import loggerMiddleware from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";

import { userRouter } from "./routes/userRoutes";
import { petRouter } from "./routes/petRoutes";
import { notificationRouter } from "./routes/notificationRoutes";
import { notificationDetailRouter } from "./routes/notificationDetailRoutes";
import { notificationScheduleRouter } from "./routes/notificationScheduleRoutes";
import { registeredNotificationRouter } from "./routes/registeredNotificationRoutes";
import { financeRouter } from "./routes/financeRoutes";
import { registeredFinanceRouter } from "./routes/registeredFinanceRoutes";
import { recordRouter } from "./routes/recordRoutes";

const app = express();

app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(express.json());

app.use("/users", userRouter);
app.use("/pets", petRouter);
app.use("/notifications", notificationRouter);
app.use("/notificationDetails", notificationDetailRouter);
app.use("/notificationSchedule", notificationScheduleRouter);
app.use("/registeredNotifications", registeredNotificationRouter);
app.use("/finances", financeRouter);
app.use("/registeredFinances", registeredFinanceRouter);
app.use("/records", recordRouter);

app.use(errorHandler);

export default app;
