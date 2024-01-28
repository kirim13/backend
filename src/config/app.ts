import express from "express";
import errorHandler from "../middlewares/errorHandler";
import setupMiddlewares from "../middlewares";
import setupRoutes from "./routes";

const app = express();
app.use(express.json());
setupMiddlewares(app);
setupRoutes(app);
app.use(errorHandler);
export default app;
