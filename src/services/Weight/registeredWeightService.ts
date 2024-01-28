import db from "../../utils/db.server";

type RegisteredWeight = {
  petId: string;
  weightId: string;
};

const getAllRegisteredWeights = () => {
  return db.registeredWeight.findMany({
    select: {
      id: true,
      pets: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      weight: {
        select: {
          weight: true,
          createdAt: true,
        },
      },
    },
  });
};

const getAllRegisteredWeightsViaPetId = (petId: string) => {
  return db.registeredWeight.findMany({
    where: { petId },
    select: {
      weight: {
        select: {
          weight: true,
          createdAt: true,
        },
      },
    },
  });
};

const getRegisteredWeightViaId = (id: string) => {
  return db.registeredWeight.findUnique({ where: { id } });
};

const createRegisteredWeight = (registeredWeight: RegisteredWeight) => {
  const { petId, weightId } = registeredWeight;
  return db.registeredWeight.create({
    data: {
      pets: { connect: { id: petId } },
      weight: { connect: { id: weightId } },
    },
  });
};

const deleteRegisteredWeightViaId = (id: string) => {
  return db.registeredWeight.delete({ where: { id } });
};

export {
  getAllRegisteredWeights,
  getAllRegisteredWeightsViaPetId,
  getRegisteredWeightViaId,
  createRegisteredWeight,
  deleteRegisteredWeightViaId,
};
