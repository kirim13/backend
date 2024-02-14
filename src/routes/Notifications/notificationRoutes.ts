import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as notificationService from "../../services/Notifications/notificationService";

export const notificationRouter = express.Router();

// GET: List Notifications
notificationRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await notificationService.listNotifications();
      return res.status(200).json(notifications);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// GET: List Notification via ID
notificationRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const notification = await notificationService.getNotification(id);
      if (notification) {
        return res.status(200).json(notification);
      }
      throw new Error(`Cannot find notification with id:${id}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// POST: Create Notification
notificationRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Hi from post req");
    const notification = req.body;
    try {
      const createdNotification = await notificationService.createNotification(
        notification
      );
      return res
        .status(200)
        .json(`Successfully created ${createdNotification.name}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT: Update Notification via ID
notificationRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const notification = req.body;
    try {
      const updatedNotification = await notificationService.updateNotification(
        id,
        notification
      );
      if (updatedNotification) {
        return res
          .status(200)
          .json(`Update notification ${updatedNotification.name} successfully`);
      }
      throw new Error(`Update notification ${notification.name} failed`);
      //eslint-disable-next-line
    } catch (err) {
      next(err);
    }
  }
);

// Delete: Delete Notification via ID
notificationRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const notification = await notificationService.deleteNotification(id);
      if (notification) {
        return res
          .status(200)
          .json({ message: `Deleted ${notification.name} successfully` });
      }
      throw new Error(`Delete notification with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      console.log(err.message);
      next(err);
    }
  }
);
