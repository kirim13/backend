import { Notification } from "../../typings/notification";
import db from "../../utils/db.server";

const listNotifications = async () => {
  return db.notification.findMany({
    select: {
      id: true,
      type: true,
      name: true,
      unit: true,
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
    date,
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
      date,
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

const upsertNotification = async (id: string, notification: Notification) => {
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
    date,
    day,
    time,
    endDate,
    repeating,
    imageSrc,
    userId,
    petId,
  } = notification;
  return db.notification.upsert({
    where: {
      id,
    },
    update: {
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
      date,
      day,
      time,
      endDate,
      repeating,
      imageSrc,
      user: { connect: { id: userId } },
      pet: { connect: { id: petId } },
    },
    create: {
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
      date,
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
    date,
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
      date,
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

const updateNotificationCompleted = async (
  id: string,
  notification: Notification
) => {
  const { completed } = notification;
  return db.notification.update({
    where: {
      id,
    },
    data: {
      completed,
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
  upsertNotification,
  updateNotification,
  updateNotificationCompleted,
  deleteNotification,
};
