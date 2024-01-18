import db from "../utils/db.server";

type Medicine = {
  name: string;
  quantity: number;
  unit: string;
  petId: string;
};

const listMedicines = async () => {
  return db.medicine.findMany({
    select: {
      id: true,
      name: true,
      quantity: true,
      unit: true,
      pet: {
        select: {
          firstName: true,
          lastName: true,
          primaryOwner: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
};

const getMedicine = async (id: string) => {
  return db.medicine.findUnique({
    where: {
      id,
    },
    include: {
      pet: {
        select: {
          firstName: true,
          lastName: true,
          primaryOwner: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
};

//eslint-disable-next-line
const createMedicine = async (medicine: Medicine) => {
  const { name, quantity, unit, petId } = medicine;
  return db.medicine.create({
    data: {
      name,
      quantity,
      unit,
      petId,
    },
    select: {
      name: true,
      quantity: true,
      unit: true,
      petId: true,
    },
  });
};

const updateMedicine = async (id: string, medicine: Medicine) => {
  const { name, quantity, unit, petId } = medicine;
  return db.medicine.update({
    where: {
      id,
    },
    data: {
      name,
      quantity,
      unit,
      petId,
    },
  });
};

const deleteMedicine = async (id: string) => {
  return db.medicine.delete({
    where: { id },
  });
};

export {
  listMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
