import express, { NextFunction, Request, Response } from "express";
import { getPost } from "../../services/Records/imageService";

export const recordRouter = express.Router();

recordRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { url, fields } = await getPost();
    try {
      if (url) {
        res.status(200).json({
          message: `Upload successful`,
          url: url,
          field: fields,
        });
      } else throw new Error("Upload failed");
    } catch (err) {
      next(err);
    }
  }
);

/*
recordRouter.get(
  "/:type?/:key?",
  async (req: Request, res: Response, next: NextFunction) => {
    const url = await getUrl(req, res);
    try {
      if (url) {
        res.status(200).json({
          message: `Upload successful`,
          url: url,
        });
      } else throw new Error("Upload failed");
    } catch (err) {
      next(err);
    }
  }
);
*/
