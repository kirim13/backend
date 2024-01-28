import db from "../../utils/db.server";
import { Item } from "../../types/inventoryTypes";

const createItem = async (itemData: Item) => {
  const { name, type } = itemData;
  return db.item.create({
    data: {
      name,
      type,
    },
  });
};

const getAllItems = async () => {
  return db.item.findMany({
    include: {
      inventory: {
        select: {
          quantity: true,
          userId: true,
        },
      },
    },
  });
};

const getItem = async (id: string) => {
  return db.item.findUnique({
    where: { id },
  });
};

const updateItem = async (id: string, itemData: Item) => {
  const { name, type } = itemData;
  return db.item.update({
    where: { id },
    data: {
      name,
      type,
    },
  });
};

const deleteItem = async (id: string) => {
  return db.item.delete({
    where: { id },
  });
};

export { createItem, getAllItems, getItem, updateItem, deleteItem };
