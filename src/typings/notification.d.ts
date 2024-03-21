import { FrequencyUnit, Repeating } from "@prisma/client";

type Notification = {
  name: string;
  type: string;
  quantity: number;
  unit: string;
  notes: string;
  files: string;
  dosageQuantity: number;
  dosageUnit: string;
  frequencyQuantity: number;
  frequencyUnit: FrequencyUnit;
  date: string;
  day: string[];
  time: string[];
  endDate: string;
  repeating: Repeating[];
  createdAt: string;
  imageSrc: string;
  userId: string;
  petId: string;
  completed?: boolean;
};

export { Notification };
