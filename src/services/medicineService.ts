import db from "../utils/db.server";

type Medicine = {
  name: string;
  unit: string;
};

const listMedicines = async () => {
  return db.medicine.findMany({
    select: {
      id: true,
      name: true,
      unit: true,
    },
  });
};

const getMedicine = async (id: string) => {
  return db.medicine.findUnique({
    where: {
      id,
    },
  });
};

const createMedicine = async (medicine: Medicine) => {
  const { name, unit } = medicine;
  return db.medicine.create({
    data: {
      name,
      unit,
    },
  });
};

const updateMedicine = async (id: string, medicine: Medicine) => {
  const { name, unit } = medicine;
  return db.medicine.update({
    where: {
      id,
    },
    data: {
      name,
      unit,
    },
  });
};

const deleteMedicine = async (id: string) => {
  return db.medicine.delete({
    where: {
      id,
    },
  });
};

export {
  listMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
