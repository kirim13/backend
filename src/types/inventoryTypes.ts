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

export { Item, Inventory };
