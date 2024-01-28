import db from "../../utils/db.server";

type RegisteredNotification = {
  petId: string;
  notificationScheduleId: string;
};

const getAllRegisteredNotifications = () => {
  return db.registeredNotification.findMany({
    select: {
      id: true,
      pet: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      notificationSchedules: {
        select: {
          day: true,
          hour: true,
          minute: true,
          timeOfDay: true,
          endDate: true,
          repeating: true,
          notificationDetails: {
            select: {
              dosageQuantity: true,
              dosageUnit: true,
              frequencyQuantity: true,
              frequencyUnit: true,
              notification: {
                select: {
                  name: true,
                  type: true,
                },
              },
            },
          },
        },
      },
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

export {
  getAllRegisteredNotifications,
  getAllRegisteredNotificationsViaPetId,
  getRegisteredNotificationViaId,
  createRegisteredNotification,
  deleteRegisteredNotificationViaId,
};
