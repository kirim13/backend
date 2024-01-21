import db from "../utils/db.server";

const getAllMedicineDetails = async () => {
  return db.medicineDetail.findMany({
    select: {
      id: true,
      dosageQuantity: true,
      dosageUnit: true,
      frequencyQuantity: true,
      frequencyUnit: true,
      medicine: {
        select: {
          name: true,
          unit: true,
        },
      },
    },
  });
};

const getAllMedicineDetailsViaId = async (medicineId: string) => {
  return db.medicineDetail.findMany({
    where: { medicineId },
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
  return db.medicineDetail.findUnique({
    where: {
      id,
    },
  });
};

//eslint-disable-next-line
const createMedicineDetail = async (medicineDetails: any) => {
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
  return db.medicineDetail.create({
    data: {
      dosageQuantity,
      dosageUnit,
      frequencyQuantity,
      frequencyUnit,
      hour,
      minute,
      timeOfDay,
      medicine: { connect: { id: medicineId } },
    },
  });
};

//eslint-disable-next-line
const updateMedicineDetail = async (id: string, medicineDetails: any) => {
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
  return db.medicineDetail.update({
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
      medicine: { connect: { id: medicineId } },
    },
  });
};

const deleteMedicineDetail = async (id: string) => {
  return db.medicineDetail.delete({
    where: {
      id,
    },
  });
};

export {
  getAllMedicineDetails,
  getAllMedicineDetailsViaId,
  getMedicineDetails,
  createMedicineDetail,
  updateMedicineDetail,
  deleteMedicineDetail,
};
