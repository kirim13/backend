import express from "express";
import type { NextFunction, Request, Response } from "express";

import * as userService from "../../services/Users/userService";

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

// GET: List User by ID
userRouter.get(
  "/username/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.params.username;
    try {
      const user = await userService.getUserViaUsername(username);
      if (user) {
        return res.status(200).json(user);
      }
      throw Error(`Cannot find user with username:${username}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);

// GET: List Pet Notification by User ID and Pet Id
userRouter.get(
  "/petData/:username/:petId",
  async (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username;
    const petId = req.params.petId;
    try {
      const user = await userService.getNotificationViaPetsFullName(
        username,
        petId
      );
      if (!user) throw Error(`Cannot find user with username: ${username}`);
      if (!petId) throw Error(`Cannot find pet with id: ${petId}`);
      if (user) {
        return res.status(200).json(user);
      }
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
        message: `Created ${createdUser.firstName} ${createdUser.lastName} successfully`,
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
    const { id } = req.params;
    const user = req.body;
    try {
      const updatedUser = await userService.updateUser(id, user);
      if (updatedUser) {
        return res.status(200).json({
          message: `Updated ${updatedUser.firstName} ${updatedUser.lastName} successfully`,
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
    const { id } = req.params;
    try {
      const user = await userService.deleteUser(id);
      if (user) {
        return res.status(200).json({
          message: `Deleted ${user.firstName} ${user.lastName} successfully`,
        });
      }
      throw new Error(`Cannot find user with id:${id}`);
      //eslint-disable-next-line
    } catch (err: any) {
      next(err);
    }
  }
);
