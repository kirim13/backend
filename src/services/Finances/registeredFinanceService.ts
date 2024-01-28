import db from "../../utils/db.server";

type RegisteredFinance = {
  petId: string;
  financeId: string;
};

const getAllRegisteredFinances = () => {
  return db.registeredFinance.findMany({
    select: {
      id: true,
      pets: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      finance: {
        select: {
          type: true,
          name: true,
          amount: true,
          createdAt: true,
        },
      },
    },
  });
};

const getAllRegisteredFinancesViaPetId = (petId: string) => {
  return db.registeredFinance.findMany({
    where: { petId },
    select: {
      finance: {
        select: {
          type: true,
          name: true,
          amount: true,
          createdAt: true,
        },
      },
    },
  });
};

const getRegisteredFinanceViaId = (id: string) => {
  return db.registeredFinance.findUnique({ where: { id } });
};

const createRegisteredFinance = (registeredFinance: RegisteredFinance) => {
  const { petId, financeId } = registeredFinance;
  return db.registeredFinance.create({
    data: {
      pets: { connect: { id: petId } },
      finance: { connect: { id: financeId } },
    },
  });
};

const deleteRegisteredFinanceViaId = (id: string) => {
  return db.registeredFinance.delete({ where: { id } });
};

export {
  getAllRegisteredFinances,
  getAllRegisteredFinancesViaPetId,
  getRegisteredFinanceViaId,
  createRegisteredFinance,
  deleteRegisteredFinanceViaId,
};
