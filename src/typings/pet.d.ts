import { PetType } from "@prisma/client";

// Format: MM/DD/YYYY
const date: Date = new Date();
const formattedDate: string = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export type ShortPet = {
  id: string;
  firstName: string;
  lastName: string;
  breed: string;
  type: PetType;
};

export type PetOwner = {
  id: string;
  firstName: string;
  lastName: string;
  breed: string;
  type: PetType;
  birthday: typeof formattedDate;
  gotchaDate: typeof formattedDate;
  active: boolean;
  primaryOwnerId: string;
};
