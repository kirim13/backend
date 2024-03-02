import { RelationshipStatus } from "@prisma/client";

interface Relationship {
  status: RelationshipStatus;
  toUserId: string;
  fromUserId: string;
}

export { Relationship };
