import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as notificationScheduleService from "../services/notificationScheduleService";

export const notificationScheduleRouter = express.Router();

notificationScheduleRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications =
        await notificationScheduleService.getAllNotificationSchedules();
      if (notifications.length === 0) {
        return res
          .status(400)
          .json({ error: "No registered notification schedules" });
      } else if (notifications) {
        return res.status(200).json(notifications);
      } else
        return res
          .status(400)
          .json({ error: "Failed to get all notification schedules" });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationScheduleRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { notificationDetailId } = req.params;
    try {
      const notifications =
        await notificationScheduleService.getAllNotificationSchedulesViaId(
          notificationDetailId
        );

      if (notifications.length === 0) {
        return res.status(400).json({
          error: `No registered notification schedules for notification detail with id:${notificationDetailId}`,
        });
      } else if (notifications) {
        return res.status(200).json(notifications);
      } else
        return res.status(400).json({
          error: `Failed to get all notification schedules for notification detail with id:${notificationDetailId}`,
        });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationScheduleRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const notification =
        await notificationScheduleService.getNotificationSchedule(id);
      if (notification) {
        return res.status(200).json(notification);
      }
      return res.status(400).json({
        error: `Failed to get notification schedule with id:${id}`,
      });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationScheduleRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationDetailData = req.body;
    try {
      const notification =
        await notificationScheduleService.createNotificationSchedule(
          notificationDetailData
        );
      if (notification) {
        return res
          .status(200)
          .json({ message: `Successfully created notification schedule` });
      }
      return res
        .status(400)
        .json({ error: `Failed to create notification schedule` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationScheduleRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const notificationDetailData = req.body;
    try {
      const notification =
        await notificationScheduleService.updateNotificationSchedule(
          id,
          notificationDetailData
        );
      if (notification) {
        return res.status(200).json({
          message: `Successfully updated notification schedule with id:${id}`,
        });
      }
      return res.status(400).json({
        error: `Failed to updated notification schedule with id:${id}`,
      });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationScheduleRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const notification =
        await notificationScheduleService.deleteNotificationSchedule(id);
      if (notification) {
        return res.status(200).json({
          message: `Successfully deleted notification schedule with id:${id}`,
        });
      }
      return res.status(400).json({
        error: `Failed to get notification schedule with id:${id}`,
      });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
