import db from "../utils/db.server";

const getAllRegisteredMedicines = () => {
  return db.registeredMedicine.findMany({
    include: {
      pet: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      medicineNotification: true,
    },
  });
};

const getAllRegisteredMedicinesViaPetId = (petId: string) => {
  return db.registeredMedicine.findMany({ where: { petId } });
};

const getRegisteredMedicineViaId = (id: string) => {
  return db.registeredMedicine.findUnique({ where: { id } });
};

const getRegisteredMedicineViaPetId = (id: string) => {
  return db.registeredMedicine.findUnique({ where: { id } });
};

//eslint-disable-next-line
const createRegisteredMedicine = (registeredMedicine: any) => {
  const { petId, medicinenotifid } = registeredMedicine;
  return db.registeredMedicine.create({
    data: {
      pet: { connect: { id: petId } },
      medicineNotification: { connect: { id: medicinenotifid } },
    },
  });
};

const deleteRegisteredMedicineViaId = (id: string) => {
  return db.registeredMedicine.delete({ where: { id } });
};

const deleteRegisteredMedicineViaPetId = (id: string) => {
  return db.registeredMedicine.delete({ where: { id } });
};

export {
  getAllRegisteredMedicines,
  getAllRegisteredMedicinesViaPetId,
  getRegisteredMedicineViaId,
  getRegisteredMedicineViaPetId,
  createRegisteredMedicine,
  deleteRegisteredMedicineViaId,
  deleteRegisteredMedicineViaPetId,
};
