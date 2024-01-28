import db from "../../utils/db.server";
import { Inventory } from "../../types/inventoryTypes";

const createInventory = async (inventoryData: Inventory) => {
  const { quantity, itemId, userId } = inventoryData;
  return db.inventory.create({
    data: {
      quantity,
      items: { connect: { id: itemId } },
      users: { connect: { id: userId } },
    },
  });
};

const getAllInventory = async () => {
  return db.inventory.findMany({
    include: {
      users: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      items: {
        select: {
          name: true,
          type: true,
        },
      },
    },
  });
};

const getInventory = async (id: string) => {
  return db.inventory.findUnique({
    where: { id },
  });
};

const updateInventory = async (id: string, inventoryData: Inventory) => {
  const { quantity, itemId, userId } = inventoryData;
  return db.inventory.update({
    where: { id },
    data: {
      quantity,
      items: { connect: { id: itemId } },
      users: { connect: { id: userId } },
    },
  });
};

const deleteInventory = async (id: string) => {
  return db.inventory.delete({
    where: { id },
  });
};

export {
  createInventory,
  getAllInventory,
  getInventory,
  updateInventory,
  deleteInventory,
};
