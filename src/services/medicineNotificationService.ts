import db from "../utils/db.server";

const getAllMedicineNotifications = async () => {
  return db.medicineNotification.findMany({
    include: {
      medicineDetail: {
        select: {
          dosageQuantity: true,
          dosageUnit: true,
          frequencyQuantity: true,
          frequencyUnit: true,
          medicine: {
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

const getAllMedicineNotificationsViaId = async (medicineDetailId: string) => {
  return db.medicineNotification.findMany({
    where: { medicineDetailId },
    select: {
      day: true,
      hour: true,
      minute: true,
      timeOfDay: true,
      endDate: true,
      repeating: true,
      medicineDetail: true,
    },
  });
};

const getMedicineNotification = async (id: string) => {
  return db.medicineNotification.findUnique({
    where: {
      id,
    },
  });
};

//eslint-disable-next-line
const createMedicineNotification = async (medicineDetails: any) => {
  const { day, hour, minute, timeOfDay, endDate, repeating, medicineDetailId } =
    medicineDetails;
  return db.medicineNotification.create({
    data: {
      day,
      hour,
      minute,
      timeOfDay,
      endDate,
      repeating,
      medicineDetail: { connect: { id: medicineDetailId } },
    },
  });
};

const updateMedicineNotification = async (
  id: string,
  //eslint-disable-next-line
  medicineNotifications: any
) => {
  const { day, hour, minute, timeOfDay, endDate, repeating, medicineDetailId } =
    medicineNotifications;
  return db.medicineNotification.update({
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
      medicineDetail: { connect: { id: medicineDetailId } },
    },
  });
};

const deleteMedicineNotification = async (id: string) => {
  return db.medicineNotification.delete({
    where: {
      id,
    },
  });
};

export {
  getAllMedicineNotifications,
  getAllMedicineNotificationsViaId,
  getMedicineNotification,
  createMedicineNotification,
  updateMedicineNotification,
  deleteMedicineNotification,
};
