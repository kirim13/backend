import db from "../../utils/db.server";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const listUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      passwordMatch: true,
      createdAt: true,
      appearanceMode: true,
      pets: true,
    },
  });
};

const getUser = async (id: string): Promise<object | null> => {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      pets: true,
    },
  });
};

const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { firstName, lastName, email, password } = user;
  return db.user.create({
    data: {
      firstName,
      lastName,
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

export { User, listUsers, getUser, createUser, updateUser, deleteUser };
