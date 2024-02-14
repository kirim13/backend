import db from "../../utils/db.server";
import { FrequencyUnit, Repeating } from "@prisma/client";

type Notification = {
  name: string;
  type: string;
  quantity: number;
  unit: string;
  notes: string;
  files: string;
  dosage_quantity: number;
  dosage_unit: string;
  frequency_quantity: number;
  frequency_unit: FrequencyUnit;
  dayOfTheWeek: string;
  time: string;
  end_date: string;
  isRepeating: Repeating;
  createdAt: string;
  imageSrc: string;
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
  const {
    name,
    type,
    quantity,
    unit,
    notes,
    files,
    dosage_quantity,
    dosage_unit,
    frequency_quantity,
    frequency_unit,
    dayOfTheWeek,
    time,
    end_date,
    isRepeating,
    imageSrc,
  } = notification;
  return db.notification.create({
    data: {
      name,
      type,
      quantity,
      unit,
      notes,
      photos: files,
      dosageQuantity: dosage_quantity,
      dosageUnit: dosage_unit,
      frequencyQuantity: frequency_quantity,
      frequencyUnit: frequency_unit,
      day: dayOfTheWeek,
      time,
      endDate: end_date,
      repeating: isRepeating,
      imageSrc,
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
