import db from "../../utils/db.server";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
};

const listUsers = async () => {
  return db.user.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      userFriends: true,
      friendUserFriends: true,
    },
  });
};

const listActiveUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    },
  });
};

//: Promise<object | null>
const getUser = async (id: string) => {
  return db.user.findUnique({
    where: { id },
    include: { userFriends: true, friendUserFriends: true },
  });
};

const getUserViaUsername = async (username: string) => {
  return db.user.findUnique({
    where: { username },
  });
};

const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { firstName, lastName, username, email, password } = user;
  return db.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      password,
    },
  });
};

const updateUser = async (
  id: string,
  user: Omit<User, "id">
): Promise<User | null> => {
  const { firstName, lastName, email, password } = user;
  return db.user.update({
    where: { id },
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
};

const deleteUser = async (id: string) => {
  return db.user.delete({
    where: {
      id,
    },
  });
};

export {
  User,
  listUsers,
  listActiveUsers,
  getUser,
  getUserViaUsername,
  createUser,
  updateUser,
  deleteUser,
};
