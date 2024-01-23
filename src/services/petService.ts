import db from "../utils/db.server";
import { PetType } from "@prisma/client";

// Format: MM/DD/YYYY
const date: Date = new Date();
const formattedDate: string = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

type ShortPet = {
  id: string;
  firstName: string;
  lastName: string;
  breed: string;
  type: PetType;
};

type PetOwner = {
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
      primaryOwner: { connect: { id: primaryOwnerId } },
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

//eslint-disable-next-line
const updatePet = async (id: string, petData: any) => {
  const {
    firstName,
    lastName,
    breed,
    type,
    birthday,
    gotchaDate,
    active,
    primaryOwnerId,
  } = petData;
  return db.pet.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      breed,
      type,
      birthday,
      gotchaDate,
      active,
      primaryOwner: { connect: { id: primaryOwnerId } },
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

export { listPets, getPet, createPet, updatePet, deletePet };
