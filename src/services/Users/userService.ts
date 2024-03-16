import { User } from "../../typings/user";
import db from "../../utils/db.server";

const listUsers = async () => {
  return db.user.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      userFriends: true,
      friendUserFriends: true,
      pets: {
        select: {
          firstName: true,
          lastName: true,
          type: true,
          notifications: {
            select: {
              id: true,
              type: true,
            },
          },
        },
      },
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

const getUser = async (id: string) => {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      userFriends: true,
      friendUserFriends: true,
      pets: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          type: true,
          notifications: {
            select: {
              id: true,
              type: true,
            },
          },
        },
      },
    },
  });
};

const getUserViaUsername = async (username: string) => {
  return db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      userFriends: true,
      friendUserFriends: true,
      pets: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          type: true,
          notifications: {
            select: {
              id: true,
              type: true,
            },
          },
        },
      },
    },
  });
};

const getNotificationViaPetsFullName = async (
  username: string,
  petId: string
) => {
  return db.user.findUnique({
    where: { username },
    select: {
      pets: {
        where: {
          id: petId,
        },
        select: {
          notifications: true,
        },
      },
    },
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
  getNotificationViaPetsFullName,
  createUser,
  updateUser,
  deleteUser,
};
