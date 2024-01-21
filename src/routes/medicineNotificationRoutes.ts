import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as MedicineNotificationServices from "../services/medicineNotificationService";

export const medicineNotificationRouter = express.Router();

medicineNotificationRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medicines =
        await MedicineNotificationServices.getAllMedicineNotifications();
      if (medicines.length === 0) {
        return res
          .status(400)
          .json({ error: "No registered medicine notifications" });
      } else if (medicines) {
        return res.status(200).json(medicines);
      } else
        return res
          .status(400)
          .json({ error: "Failed to get all medicine notifications" });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineNotificationRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { medicineDetailId } = req.params;
    try {
      const medicines =
        await MedicineNotificationServices.getAllMedicineNotificationsViaId(
          medicineDetailId
        );

      if (medicines.length === 0) {
        return res.status(400).json({
          error: `No registered medicine notifications for medicine detail with id:${medicineDetailId}`,
        });
      } else if (medicines) {
        return res.status(200).json(medicines);
      } else
        return res.status(400).json({
          error: `Failed to get all medicine notifications for medicine detail with id:${medicineDetailId}`,
        });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineNotificationRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const medicine =
        await MedicineNotificationServices.getMedicineNotification(id);
      if (medicine) {
        return res.status(200).json(medicine);
      }
      return res
        .status(400)
        .json({ error: `Failed to get medicine notification with id:${id}` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineNotificationRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const medicineDetailData = req.body;
    try {
      const medicine =
        await MedicineNotificationServices.createMedicineNotification(
          medicineDetailData
        );
      if (medicine) {
        return res
          .status(200)
          .json({ message: `Successfully created medicine notification` });
      }
      return res
        .status(400)
        .json({ error: `Failed to create medicine notification` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineNotificationRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const medicineDetailData = req.body;
    try {
      const medicine =
        await MedicineNotificationServices.updateMedicineNotification(
          id,
          medicineDetailData
        );
      if (medicine) {
        return res.status(200).json({
          message: `Successfully updated medicine notification with id:${id}`,
        });
      }
      return res.status(400).json({
        error: `Failed to updated medicine notification with id:${id}`,
      });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

medicineNotificationRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const medicine =
        await MedicineNotificationServices.deleteMedicineNotification(id);
      if (medicine) {
        return res.status(200).json({
          message: `Successfully deleted medicine notification with id:${id}`,
        });
      }
      return res
        .status(400)
        .json({ error: `Failed to get medicine notification with id:${id}` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
