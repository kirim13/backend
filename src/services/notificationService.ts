import db from "../utils/db.server";
import { NotificationType } from "@prisma/client";

type Notification = {
  name: string;
  type: NotificationType;
  quantity: number;
  unit: string;
};

const listNotifications = async () => {
  return db.notification.findMany({
    select: {
      id: true,
      type: true,
      name: true,
      unit: true,
      notificationDetails: true,
    },
  });
};

const getNotification = async (id: string) => {
  return db.notification.findUnique({
    where: {
      id,
    },
  });
};

const createNotification = async (notification: Notification) => {
  const { name, quantity, unit, type } = notification;
  return db.notification.create({
    data: {
      name,
      type,
      quantity,
      unit,
    },
  });
};

const updateNotification = async (id: string, notification: Notification) => {
  const { name, quantity, unit, type } = notification;
  return db.notification.update({
    where: {
      id,
    },
    data: {
      name,
      type,
      quantity,
      unit,
    },
  });
};

const deleteNotification = async (id: string) => {
  return db.notification.delete({
    where: {
      id,
    },
  });
};

export {
  listNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
};
