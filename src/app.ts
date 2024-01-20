import "dotenv/config";
import express from "express";
import corsMiddleware from "./middlewares/cors";
import loggerMiddleware from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";

import { userRouter } from "./routes/userRoutes";
import { petRouter } from "./routes/petRoutes";
import { medicineRouter } from "./routes/medicineRoutes";
import { medicineDetailRouter } from "./routes/medicineDetailRoutes";

const app = express();

app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(express.json());

app.use("/users", userRouter);
app.use("/pets", petRouter);
app.use("/medicines", medicineRouter);
app.use("medicineDetail", medicineDetailRouter);

app.use(errorHandler);

export default app;
