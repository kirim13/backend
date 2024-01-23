import db from "../utils/db.server";

type RegisteredNotification = {
  petId: string;
  notificationScheduleId: string;
};

const getAllRegisteredNotifications = () => {
  return db.registeredNotification.findMany({
    include: {
      pet: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      notificationSchedules: true,
    },
  });
};

const getAllRegisteredNotificationsViaPetId = (petId: string) => {
  return db.registeredNotification.findMany({ where: { petId } });
};

const getRegisteredNotificationViaId = (id: string) => {
  return db.registeredNotification.findUnique({ where: { id } });
};

const createRegisteredNotification = (
  registeredNotification: RegisteredNotification
) => {
  const { petId, notificationScheduleId } = registeredNotification;
  return db.registeredNotification.create({
    data: {
      pet: { connect: { id: petId } },
      notificationSchedules: { connect: { id: notificationScheduleId } },
    },
  });
};

const deleteRegisteredNotificationViaId = (id: string) => {
  return db.registeredNotification.delete({ where: { id } });
};

const deleteRegisteredNotificationViaPetId = (id: string) => {
  return db.registeredNotification.delete({ where: { id } });
};

export {
  getAllRegisteredNotifications,
  getAllRegisteredNotificationsViaPetId,
  getRegisteredNotificationViaId,
  createRegisteredNotification,
  deleteRegisteredNotificationViaId,
  deleteRegisteredNotificationViaPetId,
};
