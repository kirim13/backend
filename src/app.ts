import "dotenv/config";
import express from "express";
import cors from "cors";

import { userRouter } from "./user/router";
import { petRouter } from "./pet/router";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/pets", petRouter);

export default app;
