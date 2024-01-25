import express from "express";
import type { NextFunction, Request, Response } from "express";
import * as registeredNotificationServices from "../services/registeredNotificationService";

export const registeredNotificationRouter = express.Router();

registeredNotificationRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registeredNotifications =
        await registeredNotificationServices.getAllRegisteredNotifications();
      if (registeredNotifications.length === 0) {
        return res.status(200).json({ message: "No registered notifications" });
      } else if (registeredNotifications.length >= 1) {
        return res.status(200).json(registeredNotifications);
      } else throw new Error("Get all registered notifications failed");
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredNotificationRouter.get(
  "/:petid",
  async (req: Request, res: Response, next: NextFunction) => {
    const { petId } = req.params;
    try {
      const registeredNotifications =
        await registeredNotificationServices.getAllRegisteredNotificationsViaPetId(
          petId
        );
      if (registeredNotifications.length === 0) {
        return res.status(200).json({
          message: `No registered notifications with pet id:${petId}`,
        });
      } else if (registeredNotifications.length > 1) {
        return res.status(200).json(registeredNotifications);
      } else
        throw new Error(
          `Get all registered notifications with pet id:${petId} failed`
        );
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredNotificationRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredNotification =
        await registeredNotificationServices.getRegisteredNotificationViaId(id);
      if (!registeredNotification) {
        return res
          .status(200)
          .json({ message: `No registered notifications with id:${id}` });
      } else if (registeredNotification) {
        return res.status(200).json(registeredNotification);
      } else
        throw new Error(`Get registered notification with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

registeredNotificationRouter.post(
  "/:petid/:notificationscheduleid",
  async (req: Request, res: Response, next: NextFunction) => {
    const registeredNotificationData = {
      petId: req.params.petid,
      notificationScheduleId: req.params.notificationscheduleid,
    };
    try {
      const registeredNotification =
        await registeredNotificationServices.createRegisteredNotification(
          registeredNotificationData
        );
      if (!registeredNotification) {
        return res.status(200).json({ message: `No registered notification` });
      } else if (registeredNotification) {
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

registeredNotificationRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const registeredNotification =
        await registeredNotificationServices.deleteRegisteredNotificationViaId(
          id
        );
      if (!registeredNotification) {
        return res
          .status(200)
          .json({ message: `No registered notifications with id:${id}` });
      } else if (registeredNotification) {
        return res.status(200).json(registeredNotification);
      } else
        throw new Error(`Delete registered notification with id:${id} failed`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
