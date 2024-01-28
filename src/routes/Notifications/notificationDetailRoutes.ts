import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as notificationDetailServices from "../../services/Notifications/notificationDetailService";

export const notificationDetailRouter = express.Router();

notificationDetailRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications =
        await notificationDetailServices.getAllNotificationDetails();
      if (notifications.length === 0) {
        return res
          .status(400)
          .json({ error: "No registered notification details" });
      } else if (notifications) {
        return res.status(200).json(notifications);
      } else
        return res
          .status(400)
          .json({ error: "Failed to get all notifications" });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationDetailRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { notificationId } = req.params;
    try {
      const notifications =
        await notificationDetailServices.getAllNotificationDetailsViaId(
          notificationId
        );

      if (notifications.length === 0) {
        return res.status(400).json({
          error: `No registered notification details for notification with id:${notificationId}`,
        });
      } else if (notifications) {
        return res.status(200).json(notifications);
      } else
        return res.status(400).json({
          error: `Failed to get all notification details for notification with id:${notificationId}`,
        });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationDetailRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const notification =
        await notificationDetailServices.getNotificationDetails(id);
      if (notification) {
        return res.status(200).json(notification);
      }
      return res
        .status(400)
        .json({ error: `Failed to get notification with id:${id}` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationDetailRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationData = req.body;
    try {
      const notification =
        await notificationDetailServices.createNotificationDetail(
          notificationData
        );
      if (notification) {
        return res
          .status(200)
          .json({ message: `Successfully created notification` });
      }
      return res.status(400).json({ error: `Failed to create notification` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationDetailRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const notificationData = req.body;
    try {
      const notification =
        await notificationDetailServices.updateNotificationDetail(
          id,
          notificationData
        );
      if (notification) {
        return res
          .status(200)
          .json({ message: `Successfully updated notification with id:${id}` });
      }
      return res
        .status(400)
        .json({ error: `Failed to updated notification with id:${id}` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

notificationDetailRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const notification =
        await notificationDetailServices.deleteNotificationDetail(id);
      if (notification) {
        return res
          .status(200)
          .json({ message: `Successfully deleted notification with id:${id}` });
      }
      return res
        .status(400)
        .json({ error: `Failed to get notification with id:${id}` });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
