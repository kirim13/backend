import db from "../utils/db.server";

const getAllRegisteredMedicines = () => {
  return db.registeredMedicine.findMany({});
};

const getAllRegisteredMedicinesViaPetId = () => {
  return db.registeredMedicine.findMany({});
};

const getRegisteredMedicinesViaId = (id: string) => {
  return db.registeredMedicine.findUnique({ where: { id } });
};

const getRegisteredMedicinesViaPetId = (id: string) => {
  return db.registeredMedicine.findUnique({ where: { id } });
};

const deleteRegisteredMedicinesViaId = (id: string) => {
  return db.registeredMedicine.delete({ where: { id } });
};

const deleteRegisteredMedicinesViaPetId = (id: string) => {
  return db.registeredMedicine.delete({ where: { id } });
};

export {
  getAllRegisteredMedicines,
  getAllRegisteredMedicinesViaPetId,
  getRegisteredMedicinesViaId,
  getRegisteredMedicinesViaPetId,
  deleteRegisteredMedicinesViaId,
  deleteRegisteredMedicinesViaPetId,
};
