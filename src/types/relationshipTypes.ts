import { Status } from "@prisma/client";

type Relationship = {
  status: Status;
  fromUserId: string;
  toUserId: string;
};

export { Relationship };
