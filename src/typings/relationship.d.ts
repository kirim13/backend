import { RelationshipStatus } from "@prisma/client";

type Relationship = {
  userId: string;
  friendId: string;
  status: RelationshipStatus;
  updatedAt: DateTime;
};

export { Relationship };
