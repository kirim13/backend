import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as registeredFinanceServices from "../services/registeredFinanceService";

export const registeredFinanceRouter = express.Router();

registeredFinanceRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registeredFinances =
        await registeredFinanceServices.getAllRegisteredFinances();
      if (registeredFinances.length === 0) {
        return res.status(200).json({ message: "No registered finances" });
      } else if (registeredFinances.length >= 1) {
        return res.status(200).json(registeredFinances);
      } else throw new Error("Get all registered finances failed");
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredFinanceRouter.get(
  "/:petid",
  async (req: Request, res: Response, next: NextFunction) => {
    const { petId } = req.params;
    try {
      const registeredFinances =
        await registeredFinanceServices.getAllRegisteredFinancesViaPetId(petId);
      if (registeredFinances.length === 0) {
        return res.status(200).json({
          message: `No registered finances with pet id:${petId}`,
        });
      } else if (registeredFinances.length > 1) {
        return res.status(200).json(registeredFinances);
      } else
        throw new Error(
          `Get all registered finances with pet id:${petId} failed`
        );
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredFinanceRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredFinance =
        await registeredFinanceServices.getRegisteredFinanceViaId(id);
      if (!registeredFinance) {
        return res
          .status(200)
          .json({ message: `No registered finances with id:${id}` });
      } else if (registeredFinance) {
        return res.status(200).json(registeredFinance);
      } else
        throw new Error(`Get registered notification with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredFinanceRouter.post(
  "/:petid/:financeid",
  async (req: Request, res: Response, next: NextFunction) => {
    const registeredFinanceData = {
      petId: req.params.petid,
      financeId: req.params.financeid,
    };
    try {
      const registeredFinance =
        await registeredFinanceServices.createRegisteredFinance(
          registeredFinanceData
        );
      if (!registeredFinance) {
        return res.status(200).json({ message: `No registered notification` });
      } else if (registeredFinance) {
        return res
          .status(200)
          .json({ message: `Registered notification successfully` });
      } else throw new Error(`Create registered notification failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredFinanceRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredFinance =
        await registeredFinanceServices.deleteRegisteredFinanceViaId(id);
      if (!registeredFinance) {
        return res
          .status(200)
          .json({ message: `No registered finances with id:${id}` });
      } else if (registeredFinance) {
        return res.status(200).json(registeredFinance);
      } else
        throw new Error(`Delete registered notification with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
