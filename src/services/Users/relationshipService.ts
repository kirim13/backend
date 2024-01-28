import db from "../../utils/db.server";
import { Relationship } from "../../types/relationshipTypes";

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

const getRelationship = (id: string) => {
  return db.relationship.findUnique({
    where: { id },
    include: {
      fromUser: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      toUser: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

const updateRelationship = (id: string, relationshipData: Relationship) => {
  const { status, fromUserId, toUserId } = relationshipData;
  return db.relationship.update({
    where: { id },
    data: {
      status,
      fromUserId,
      toUserId,
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
  getRelationship,
  updateRelationship,
  deleteRelationship,
};
