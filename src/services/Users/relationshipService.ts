import db from "../../utils/db.server";
import { Relationship } from "../../typings/relationship";
import { RelationshipStatus } from "@prisma/client";

const sendRelationshipRequest = (relationshipData: Relationship) => {
  const { status, fromUserId, toUserId } = relationshipData;
  return db.relationship.create({
    data: {
      status,
      fromUserId,
      toUserId,
    },
  });
};

const getAllRelationships = () => {
  return db.relationship.findMany({});
};

const getAllRelationshipsViaStatus = (status: RelationshipStatus) => {
  return db.relationship.findMany({ where: { status } });
};

const getRelationship = (id: string) => {
  return db.relationship.findUnique({
    where: { id },
    include: {
      toUser: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      fromUser: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

const updateRelationship = (id: string, relationshipData: Relationship) => {
  const { status, toUserId, fromUserId } = relationshipData;
  return db.relationship.update({
    where: { id },
    data: {
      status,
      toUserId,
      fromUserId,
    },
  });
};

const acceptRelationship = (id: string, relationshipData: Relationship) => {
  const { status } = relationshipData;
  return db.relationship.update({
    where: { id },
    data: {
      status,
    },
  });
};

const deleteRelationship = (id: string) => {
  return db.relationship.delete({
    where: { id },
  });
};

export {
  sendRelationshipRequest,
  getAllRelationships,
  getAllRelationshipsViaStatus,
  getRelationship,
  updateRelationship,
  acceptRelationship,
  deleteRelationship,
};
