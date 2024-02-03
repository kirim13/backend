type subType = "TEXT" | "EMAIL";

type users = {
  userId: string;
  subType: subType;
  isHost: boolean;
};

export { users };
