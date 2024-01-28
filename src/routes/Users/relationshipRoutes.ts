import express, { NextFunction, Request, Response } from "express";
import * as relationshipServices from "../../services/Users/relationshipService";

export const relationshipRouter = express.Router();

relationshipRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const relationshipData = req.body;
    relationshipData.status = "PENDING";
    if (!relationshipData) throw new Error("Relationship data is required");
    try {
      const relationshipRequest =
        await relationshipServices.sendRelationshipRequest(relationshipData);
      if (relationshipRequest) {
        res
          .status(200)
          .json(`Sent request to id:${relationshipData.toUserId} successfully`);
      } else
        throw new Error(
          `Sent request to id:${relationshipData.toUserId} failed`
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
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const relationship = await relationshipServices.getRelationship(id);
      if (!relationship) {
        res.status(200).json(`Get relationship with id${id} failed`);
      } else if (relationship) {
        res.status(200).json(relationship);
      } else throw new Error(`Get relationship with id${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

relationshipRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const relationshipData = req.body;
    if (!id) throw new Error("Id is required");
    if (!relationshipData) throw new Error("Relationship data is required");
    try {
      const relationship = await relationshipServices.updateRelationship(
        id,
        relationshipData
      );
      if (!relationship) {
        res.status(200).json(`Update relationship with id${id} failed`);
      } else if (relationship) {
        res
          .status(200)
          .json(
            `Updated relationship request to ${relationshipData.status} successfully`
          );
      } else throw new Error(`Update relationship with id${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

relationshipRouter.put(
  "/accept/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const relationshipData = req.body;
    relationshipData.status = "CONFIRMED";
    if (!id) throw new Error("Id is required");
    if (!relationshipData) throw new Error("Relationship data is required");
    try {
      const relationship = await relationshipServices.acceptRelationship(
        id,
        relationshipData
      );
      if (!relationship) {
        res.status(200).json(`Accept relationship with id${id} failed`);
      } else if (relationship) {
        res.status(200).json("Accepted relationship request successfully");
      } else throw new Error(`Accept relationship with id${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);

relationshipRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) throw new Error("Id is required");
    try {
      const relationship = await relationshipServices.deleteRelationship(id);
      if (!relationship) {
        res.status(200).json(`Delete relationship with id${id} failed`);
      } else if (relationship) {
        res.status(200).json("Deleted relationship request successfully");
      } else throw new Error(`Delete relationship with id${id} failed`);
    } catch (err) {
      next(err);
    }
  }
);
