import { RelationshipStatus } from "@prisma/client";

interface Relationship {
  status: RelationshipStatus;
  fromUserId: string;
  toUserId: string;
}

export { Relationship };
