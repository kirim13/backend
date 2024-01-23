import { Repeating, TimeOfDay } from "@prisma/client";
import db from "../utils/db.server";

// Format: MM/DD/YYYY
const date: Date = new Date();
const formattedDate: string = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

type NotificationDetails = {
  day: string;
  hour: number;
  minute: number;
  timeOfDay: TimeOfDay;
  endDate: typeof formattedDate;
  repeating: Repeating;
  notificationDetailId: string;
};

const getAllNotificationSchedules = async () => {
  return db.notificationSchedule.findMany({
    include: {
      notificationDetails: {
        select: {
          dosageQuantity: true,
          dosageUnit: true,
          frequencyQuantity: true,
          frequencyUnit: true,
          notification: {
            select: {
              name: true,
              quantity: true,
              unit: true,
            },
          },
        },
      },
    },
  });
};

// Get all notification schedules via notification detail id
const getAllNotificationSchedulesViaId = async (
  notificationDetailId: string
) => {
  return db.notificationSchedule.findMany({
    where: { notificationDetailId },
    select: {
      day: true,
      hour: true,
      minute: true,
      timeOfDay: true,
      endDate: true,
      repeating: true,
      notificationDetails: true,
    },
  });
};

const getNotificationSchedule = async (id: string) => {
  return db.notificationSchedule.findUnique({
    where: {
      id,
    },
  });
};

const createNotificationSchedule = async (
  notificationSchedules: NotificationDetails
) => {
  const {
    day,
    hour,
    minute,
    timeOfDay,
    endDate,
    repeating,
    notificationDetailId,
  } = notificationSchedules;
  return db.notificationSchedule.create({
    data: {
      day,
      hour,
      minute,
      timeOfDay,
      endDate,
      repeating,
      notificationDetails: { connect: { id: notificationDetailId } },
    },
  });
};

const updateNotificationSchedule = async (
  id: string,
  notificationSchedules: NotificationDetails
) => {
  const {
    day,
    hour,
    minute,
    timeOfDay,
    endDate,
    repeating,
    notificationDetailId,
  } = notificationSchedules;
  return db.notificationSchedule.update({
    where: {
      id,
    },
    data: {
      day,
      hour,
      minute,
      timeOfDay,
      endDate,
      repeating,
      notificationDetails: { connect: { id: notificationDetailId } },
    },
  });
};

const deleteNotificationSchedule = async (id: string) => {
  return db.notificationSchedule.delete({
    where: {
      id,
    },
  });
};

export {
  getAllNotificationSchedules,
  getAllNotificationSchedulesViaId,
  getNotificationSchedule,
  createNotificationSchedule,
  updateNotificationSchedule,
  deleteNotificationSchedule,
};
