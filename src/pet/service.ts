import db from "../utils/db.server";
import type { User } from "../user/service";
import { Type } from "@prisma/client";

const date: Date = new Date();
const formattedDate: string = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
// Format: MM/DD/YYYY

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

const listPets = async (): Promise<Pet[]> => {
  return db.pet.findMany({
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

const getPet = async (id: string): Promise<Pet | null> => {
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
    },
  });
};

const createPet = async (pet: PetOwner): Promise<Pet> => {
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

export { listPets, getPet, createPet };
