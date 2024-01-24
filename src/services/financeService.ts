import { FinanceType, Repeating } from "@prisma/client";
import db from "../utils/db.server";

type Finance = {
  type: FinanceType;
  name: string;
  amount: number;
  notes: string;
  repeating: Repeating;
  userId: string;
};

// Create a new finance under a user
const createFinance = async (financeData: Finance) => {
  const { type, name, amount, notes, repeating, userId } = financeData;
  return db.finance.create({
    data: {
      type,
      name,
      amount,
      notes,
      repeating,
      users: { connect: { id: userId } },
    },
  });
};

// Get all finances
const getAllFinances = async () => {
  return db.finance.findMany({
    select: {
      id: true,
      type: true,
      name: true,
      amount: true,
    },
  });
};

// Get all of an user's finances
const getAllFinancesViaUser = async (userId: string) => {
  return db.finance.findMany({
    where: {
      userId,
    },
  });
};

// Get all of a type of finances
//eslint-disable-next-line
const getAllFinancesViaType = async (type: any) => {
  return db.finance.findMany({
    where: {
      type,
    },
  });
};

// Get finance via id
const getFinance = async (id: string) => {
  return db.finance.findUnique({
    where: { id },
    include: { users: true },
  });
};

// Update finance via id
const updateFinance = async (id: string, financeData: Finance) => {
  const { type, name, amount, notes, repeating, userId } = financeData;
  return db.finance.update({
    where: { id },
    data: {
      type,
      name,
      amount,
      notes,
      repeating,
      users: { connect: { id: userId } },
    },
  });
};

// Delete finance via id
const deleteFinance = async (id: string) => {
  return db.finance.delete({
    where: { id },
  });
};

export {
  createFinance,
  getAllFinances,
  getAllFinancesViaUser,
  getAllFinancesViaType,
  getFinance,
  updateFinance,
  deleteFinance,
};
