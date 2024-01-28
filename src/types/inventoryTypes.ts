import { InventoryType } from "@prisma/client";

type Item = {
  name: string;
  type: InventoryType;
};

type Inventory = {
  quantity: number;
  itemId: string;
  userId: string;
};

type RegisteredInventory = {
  inventoryId: string;
  petId: string;
};

export { Item, Inventory, RegisteredInventory };
