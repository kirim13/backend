import db from "../../utils/db.server";
import { FrequencyUnit, Repeating } from "@prisma/client";

type Notification = {
  name: string;
  type: string;
  quantity: number;
  unit: string;
  notes: string;
  files: string;
  dosageQuantity: number;
  dosageUnit: string;
  frequencyQuantity: number;
  frequencyUnit: FrequencyUnit;
  day: string[];
  time: string[];
  endDate: string[];
  repeating: Repeating[];
  createdAt: string;
  imageSrc: string;
  userId: string;
  petId: string;
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

const listNotificationsViaUserId = async (userId: string) => {
  return db.notification.findMany({
    where: {
      userId,
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
  const {
    name,
    type,
    quantity,
    unit,
    notes,
    files,
    dosageQuantity,
    dosageUnit,
    frequencyQuantity,
    frequencyUnit,
    day,
    time,
    endDate,
    repeating,
    imageSrc,
    userId,
    petId,
  } = notification;
  return db.notification.create({
    data: {
      name,
      type,
      quantity,
      unit,
      notes,
      photos: files,
      dosageQuantity,
      dosageUnit,
      frequencyQuantity,
      frequencyUnit,
      day,
      time,
      endDate,
      repeating,
      imageSrc,
      user: { connect: { id: userId } },
      pet: { connect: { id: petId } },
    },
  });
};

const updateNotification = async (id: string, notification: Notification) => {
  const {
    name,
    type,
    quantity,
    unit,
    notes,
    files,
    dosageQuantity,
    dosageUnit,
    frequencyQuantity,
    frequencyUnit,
    day,
    time,
    endDate,
    repeating,
    imageSrc,
    userId,
    petId,
  } = notification;
  return db.notification.update({
    where: {
      id,
    },
    data: {
      name,
      type,
      quantity,
      unit,
      notes,
      photos: files,
      dosageQuantity,
      dosageUnit,
      frequencyQuantity,
      frequencyUnit,
      day,
      time,
      endDate,
      repeating,
      imageSrc,
      user: { connect: { id: userId } },
      pet: { connect: { id: petId } },
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
  listNotificationsViaUserId,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
};
