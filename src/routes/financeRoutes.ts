import express, { Request, Response, NextFunction } from "express";
import * as financeServices from "../services/financeService";

export const financeRouter = express.Router();

financeRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const finance = req.body;
    try {
      const financeData = await financeServices.createFinance(req.body);
      if (financeData) {
        return res
          .status(200)
          .json(`Created finance of type: ${financeData.type} successfully`);
      }
      throw new Error(`Create finance of type: ${finance.type} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

financeRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const finances = await financeServices.getAllFinances();
      if (finances.length === 0) {
        return res.status(400).json(`No finances created`);
      } else if (finances.length > 0) {
        return res.status(200).json(finances);
      } else throw new Error(`Get all finances failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

financeRouter.get(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
      const finances = await financeServices.getAllFinancesViaUser(userId);
      if (finances.length === 0) {
        return res
          .status(400)
          .json(`No finances with user id:${userId} created`);
      } else if (finances.length > 0) {
        return res.status(200).json(finances);
      } else throw new Error(`Get all finances with user id:${userId} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

financeRouter.get(
  "/types/:type",
  async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.params;
    try {
      const finances = await financeServices.getAllFinancesViaType(type);
      if (finances.length === 0) {
        return res.status(400).json(`No finances with type: ${type} created`);
      } else if (finances.length > 0) {
        return res.status(200).json(finances);
      } else throw new Error(`Get all finances with type: ${type} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

financeRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const finance = await financeServices.getFinance(id);
      if (!finance) {
        return res.status(400).json(`No finances with id: ${id}`);
      } else if (finance) {
        return res.status(200).json(finance);
      } else throw new Error(`Get finance with id: ${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

financeRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const financeData = req.body;
    try {
      const finance = await financeServices.updateFinance(id, financeData);
      if (!finance) {
        return res.status(400).json(`No finances with id: ${id}`);
      } else if (finance) {
        return res
          .status(200)
          .json(`Update finance with type: ${finance.type} successfully`);
      } else throw new Error(`Update finance with id: ${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

financeRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const finance = await financeServices.deleteFinance(id);
      if (!finance) {
        return res.status(400).json(`No finances with id: ${id}`);
      } else if (finance) {
        return res
          .status(200)
          .json(`Delete finance with type: ${finance.type} successfully`);
      } else throw new Error(`Delete finance with id: ${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
