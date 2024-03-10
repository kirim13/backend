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

const upsertRelationship = (relationshipData: Relationship) => {
  const { status, userId, friendId, updatedAt } = relationshipData;
  return db.relationship.upsert({
    where: {
      userId,
    },
    create: {
      status,
      user: { connect: { id: userId } },
      friend: { connect: { id: friendId } },
      updatedAt,
    },
    update: {
      status,
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
      relationshipId: {
        userId,
        friendId,
      },
    },
  });
};

export {
  createRelationship,
  upsertRelationship,
  getAllRelationships,
  getAllRelationshipsViaStatus,
  getRelationship,
  deleteRelationship,
};
