import db from "../utils/db.server";

const getAllMedicineDetails = async () => {
  return db.medicineDetails.findMany({
    select: {
      dosageQuantity: true,
      dosageUnit: true,
      frequencyQuantity: true,
      frequencyUnit: true,
      hour: true,
      minute: true,
      timeOfDay: true,
    },
  });
};

const getMedicineDetails = async (id: string) => {
  return db.medicineDetails.findUnique({
    where: {
      id,
    },
  });
};

//eslint-disable-next-line
const createMedicineDetails = async (medicineDetails: any) => {
  const {
    dosageQuantity,
    dosageUnit,
    frequencyQuantity,
    frequencyUnit,
    hour,
    minute,
    timeOfDay,
    medicineId,
  } = medicineDetails;
  return db.medicineDetails.create({
    data: {
      dosageQuantity,
      dosageUnit,
      frequencyQuantity,
      frequencyUnit,
      hour,
      minute,
      timeOfDay,
      medicineId,
    },
  });
};

//eslint-disable-next-line
const updateMedicineDetails = async (id: string, medicineDetails: any) => {
  const {
    dosageQuantity,
    dosageUnit,
    frequencyQuantity,
    frequencyUnit,
    hour,
    minute,
    timeOfDay,
  } = medicineDetails;
  return db.medicineDetails.update({
    where: {
      id,
    },
    data: {
      dosageQuantity,
      dosageUnit,
      frequencyQuantity,
      frequencyUnit,
      hour,
      minute,
      timeOfDay,
    },
  });
};

const deleteMedicineDetails = async (id: string) => {
  return db.medicineDetails.delete({
    where: {
      id,
    },
  });
};

export {
  getAllMedicineDetails,
  getMedicineDetails,
  createMedicineDetails,
  updateMedicineDetails,
  deleteMedicineDetails,
};
