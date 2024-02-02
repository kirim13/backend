import db from "../../utils/db.server";
import { RegisteredInventory } from "../../typings/inventory";

const getAllRegisteredInventory = () => {
  return db.registeredInventory.findMany({
    select: {
      id: true,
      pets: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      inventory: {
        select: {
          quantity: true,
          items: {
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
    },
  });
};

const getAllRegisteredInventoryViaPetId = (petId: string) => {
  return db.registeredInventory.findMany({
    where: { petId },
    select: {
      inventory: {
        select: {
          quantity: true,
          items: {
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
    },
  });
};

const getRegisteredInventoryViaId = (id: string) => {
  return db.registeredInventory.findUnique({ where: { id } });
};

const createRegisteredInventory = (
  registeredInventory: RegisteredInventory
) => {
  const { petId, inventoryId } = registeredInventory;
  return db.registeredInventory.create({
    data: {
      pets: { connect: { id: petId } },
      inventory: { connect: { id: inventoryId } },
    },
  });
};

const deleteRegisteredInventoryViaId = (id: string) => {
  return db.registeredInventory.delete({ where: { id } });
};

export {
  getAllRegisteredInventory,
  getAllRegisteredInventoryViaPetId,
  getRegisteredInventoryViaId,
  createRegisteredInventory,
  deleteRegisteredInventoryViaId,
};
