import express from "express";
import type { Request, Response } from "express";

import * as petService from "./service";

export const petRouter = express.Router();

// GET: List Pets
petRouter.get("/", async (req: Request, res: Response) => {
  try {
    const pets = await petService.listPets();
    return res.status(200).json(pets);
    //eslint-disable-next-line
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

// POST: Create pet
petRouter.post("/", async (req: Request, res: Response) => {
  const pet = req.body;
  try {
    const createdPet = await petService.createPet(req.body);
    if (createdPet) {
      return res.status(200).json({
        message: `Created ${pet.firstName} ${pet.lastName} pet successfully`,
      });
    }
    return res.status(404).json({ error: "Unable to create pet" });
    //eslint-disable-next-line
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});
