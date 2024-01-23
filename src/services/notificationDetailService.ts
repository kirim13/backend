import db from "../utils/db.server";

const getAllNotificationDetails = async () => {
  return db.notificationDetail.findMany({
    include: {
      notification: {
        select: {
          name: true,
          unit: true,
        },
      },
    },
  });
};

const getAllNotificationDetailsViaId = async (notificationId: string) => {
  return db.notificationDetail.findMany({
    where: { notificationId },
    select: {
      dosageQuantity: true,
      dosageUnit: true,
      frequencyQuantity: true,
      frequencyUnit: true,
    },
  });
};

const getNotificationDetails = async (id: string) => {
  return db.notificationDetail.findUnique({
    where: {
      id,
    },
  });
};

//eslint-disable-next-line
const createNotificationDetail = async (notificationDetails: any) => {
  const {
    dosageQuantity,
    dosageUnit,
    frequencyQuantity,
    frequencyUnit,
    notificationId,
  } = notificationDetails;
  return db.notificationDetail.create({
    data: {
      dosageQuantity,
      dosageUnit,
      frequencyQuantity,
      frequencyUnit,
      notification: { connect: { id: notificationId } },
    },
  });
};

const updateNotificationDetail = async (
  id: string,
  //eslint-disable-next-line
  notificationDetails: any
) => {
  const {
    dosageQuantity,
    dosageUnit,
    frequencyQuantity,
    frequencyUnit,
    notificationId,
  } = notificationDetails;
  return db.notificationDetail.update({
    where: {
      id,
    },
    data: {
      dosageQuantity,
      dosageUnit,
      frequencyQuantity,
      frequencyUnit,
      notification: { connect: { id: notificationId } },
    },
  });
};

const deleteNotificationDetail = async (id: string) => {
  return db.notificationDetail.delete({
    where: {
      id,
    },
  });
};

export {
  getAllNotificationDetails,
  getAllNotificationDetailsViaId,
  getNotificationDetails,
  createNotificationDetail,
  updateNotificationDetail,
  deleteNotificationDetail,
};
