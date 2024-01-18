import express from "express";
import type { NextFunction, Request, Response } from "express";

import * as userService from "../services/userService";

export const userRouter = express.Router();

// GET: List of all Users
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.listUsers();
    return res.status(200).json(users);
    //eslint-disable-next-line
  } catch (err: any) {
    next(err);
  }
});

// GET: List User by ID
userRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    try {
      const user = await userService.getUser(id);
      if (user) {
        return res.status(200).json(user);
      }
      throw Error(`Cannot find user with id:${id}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// POST: Create a new User
userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    try {
      const createdUser = await userService.createUser(user);
      return res.status(200).json({
        message: `${createdUser.firstName} ${createdUser.lastName} was successfully created`,
      });
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT: Update a User by ID
userRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const user = req.body;
    try {
      const updatedUser = await userService.updateUser(id, user);
      if (updatedUser) {
        return res.status(200).json({
          message: `${updatedUser.firstName} ${updatedUser.lastName} was successfully updated`,
        });
      }
      throw Error(`Cannot find user with id:${id}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// DELETE: Delete a User by ID
userRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    try {
      const user = await userService.deleteUser(id);
      if (user) {
        return res.status(200).json({
          message: `${user.firstName} ${user.lastName} was successfully deleted`,
        });
      }
      throw Error(`Cannot find user with id:${id}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
