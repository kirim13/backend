import express, { NextFunction, Request, Response } from "express";
import * as relationshipServices from "../../services/Users/relationshipService";

export const relationshipRouter = express.Router();

relationshipRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    if (!userData) throw new Error("User data is required");
    try {
      const addedUser = await relationshipServices.createRelationship(userData);
      if (addedUser) {
        res
          .status(200)
          .json(
            `Friend Request to user: ${userData.friendId} sent successfully`
          );
      } else
        throw new Error(`Friend Request to user: ${userData.friendId} failed`);
    } catch (err) {
      next(err);
    }
  }
);

relationshipRouter.put(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const activeRelationshipData = req.body;
    if (!activeRelationshipData)
      throw new Error("Relational user data is required");
    try {
      const addedUser = await relationshipServices.updateRelationship(
        activeRelationshipData
      );
      if (addedUser) {
        res
          .status(200)
          .json(
            `Updated user: ${activeRelationshipData.userId} relationship successfully`
          );
      } else
        throw new Error(
          `Updated user: ${activeRelationshipData.userId} relationship failed`
        );
    } catch (err) {
      next(err);
    }
  }
);

relationshipRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const relationships = await relationshipServices.getAllRelationships();
      if (relationships.length === 0) {
        res.status(200).json("Zero relationships created");
      } else if (relationships) {
        res.status(200).json(relationships);
      } else throw new Error(`Get all relationships failed`);
    } catch (err) {
      next(err);
    }
  }
);

relationshipRouter.get(
  "/status/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.body;
      const relationships =
        await relationshipServices.getAllRelationshipsViaStatus(status);
      if (relationships.length === 0) {
        res.status(200).json(`No Relationship with status: ${status} found`);
      } else if (relationships) {
        res.status(200).json(relationships);
      } else
        throw new Error(`Get all relationships with status: ${status} failed`);
    } catch (err) {
      next(err);
    }
  }
);

relationshipRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const ids = req.body;
    try {
      const relationship = await relationshipServices.getRelationship(
        ids.userId,
        ids.friendId
      );
      if (!relationship) {
        res.status(200).json(`Get relationship failed`);
      } else if (relationship) {
        res.status(200).json(relationship);
      } else throw new Error(`Get relationship failed`);
    } catch (err) {
      next(err);
    }
  }
);

relationshipRouter.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const ids = req.body;
    if (!ids) throw new Error("Ids are required");
    try {
      const relationship = await relationshipServices.deleteRelationship(
        ids.userId,
        ids.friendId
      );
      if (!relationship) {
        res.status(200).json(`Delete relationship failed`);
      } else if (relationship) {
        res.status(200).json("Deleted relationship request successfully");
      } else throw new Error(`Delete relationship failed`);
    } catch (err) {
      next(err);
    }
  }
);
