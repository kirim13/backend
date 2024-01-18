import express from "express";
import type { NextFunction, Request, Response } from "express";

import * as petService from "../services/petService";

export const petRouter = express.Router();

// GET: List Pets
petRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pets = await petService.listPets();
    return res.status(200).json(pets);
    //eslint-disable-next-line
  } catch (err: any) {
    next(err);
  }
});

// GET: List Pet by ID
petRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const pet = await petService.getPet(id);
      if (pet) {
        return res.status(200).json(pet);
      }
      throw Error(`Cannot find pet with id:${id}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// POST: Create pet
petRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const pet = req.body;
  try {
    const createdPet = await petService.createPet(req.body);
    if (createdPet) {
      return res.status(200).json({
        message: `Created ${pet.firstName} ${pet.lastName} pet successfully`,
      });
    }
    //eslint-disable-next-line
  } catch (err: any) {
    next(err);
  }
});

// DELETE: Delete pet via id
petRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const pet = await petService.deletePet(id);
      if (pet) {
        return res.status(200).json({
          message: `Deleted ${pet.firstName} ${pet.lastName} pet successfully`,
        });
      }
      throw new Error(`Failed to delete pet with id:${id}`);
    } catch (err) {
      next(err);
    }
  }
);
