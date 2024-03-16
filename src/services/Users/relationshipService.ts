import db from "../../utils/db.server";
import { Relationship } from "../../typings/relationship";
import { RelationshipStatus } from "@prisma/client";

const createRelationship = (relationshipData: Relationship) => {
  const { status, userId, friendId, updatedAt } = relationshipData;
  return db.relationship.create({
    data: {
      status,
      user: { connect: { id: userId } },
      friend: { connect: { id: friendId } },
      updatedAt,
    },
  });
};

const updateRelationship = (relationshipData: Relationship) => {
  const { status, userId, friendId, updatedAt } = relationshipData;
  return db.relationship.update({
    where: {
      userId: friendId || userId,
      friendId: userId || friendId,
    },
    data: {
      status,
      updatedAt,
    },
  });
};

const getAllRelationships = () => {
  return db.relationship.findMany({});
};

const getAllRelationshipsViaStatus = (status: RelationshipStatus) => {
  return db.relationship.findMany({ where: { status } });
};

const getRelationship = (userId: string, friendId: string) => {
  return db.relationship.findUnique({
    where: {
      relationshipId: {
        userId,
        friendId,
      },
    },
  });
};

const deleteRelationship = (userId: string, friendId: string) => {
  return db.relationship.delete({
    where: {
      userId: userId || friendId,
      friendId: friendId || userId,
    },
  });
};

export {
  createRelationship,
  updateRelationship,
  getAllRelationships,
  getAllRelationshipsViaStatus,
  getRelationship,
  deleteRelationship,
};
