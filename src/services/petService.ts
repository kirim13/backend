import db from "../utils/db.server";
// import type { User } from "./userService";
import { Type } from "@prisma/client";

const date: Date = new Date();
const formattedDate: string = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
// Format: MM/DD/YYYY

type ShortPet = {
  id: string;
  firstName: string;
  lastName: string;
  breed: string;
  type: Type;
};

/*
type Pet = {
  id: string;
  firstName: string;
  lastName: string;
  breed: string;
  type: Type;
  birthday: typeof formattedDate;
  gotchaDate: typeof formattedDate;
  active: boolean;
  primaryOwner: User;
};
*/

type PetOwner = {
  id: string;
  firstName: string;
  lastName: string;
  breed: string;
  type: Type;
  birthday: typeof formattedDate;
  gotchaDate: typeof formattedDate;
  active: boolean;
  primaryOwnerId: string;
};

const listPets = async (): Promise<ShortPet[]> => {
  return db.pet.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      breed: true,
      type: true,
      primaryOwner: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

const getPet = async (id: string) => {
  return db.pet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      breed: true,
      type: true,
      birthday: true,
      gotchaDate: true,
      active: true,
      primaryOwner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: true,
        },
      },
      medicines: true,
    },
  });
};

const createPet = async (pet: PetOwner) => {
  const {
    firstName,
    lastName,
    breed,
    type,
    birthday,
    gotchaDate,
    primaryOwnerId,
  } = pet;
  return db.pet.create({
    data: {
      firstName,
      lastName,
      breed,
      type,
      birthday,
      gotchaDate,
      primaryOwnerId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      breed: true,
      type: true,
      birthday: true,
      gotchaDate: true,
      active: true,
      primaryOwner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: true,
        },
      },
    },
  });
};

const deletePet = async (id: string) => {
  return db.pet.delete({
    where: {
      id,
    },
  });
};

export { listPets, getPet, createPet, deletePet };
