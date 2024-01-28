import db from "../../utils/db.server";

type Weight = {
  weight: number;
  targetWeight: number;
  unit: string;
  notes: string;
  userId: string;
};

const addWeight = async (weightData: Weight) => {
  const { weight, targetWeight, unit, notes, userId } = weightData;
  return db.weight.create({
    data: {
      weight,
      targetWeight,
      unit,
      notes,
      users: { connect: { id: userId } },
    },
  });
};

const getAllWeights = async () => {
  return db.weight.findMany({
    include: {
      users: { select: { firstName: true, lastName: true } },
    },
  });
};

const getWeight = async (id: string) => {
  return db.weight.findUnique({
    where: {
      id,
    },
    include: {
      users: { select: { firstName: true, lastName: true } },
    },
  });
};

const updateWeight = async (id: string, weightData: Weight) => {
  const { weight, targetWeight, unit, notes, userId } = weightData;
  return db.weight.update({
    where: { id },
    data: {
      weight,
      targetWeight,
      unit,
      notes,
      users: { connect: { id: userId } },
    },
  });
};

const deleteWeight = async (id: string) => {
  return db.weight.delete({
    where: { id },
  });
};

export { addWeight, getAllWeights, getWeight, updateWeight, deleteWeight };
