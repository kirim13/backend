declare global {
  var __db: PrismaClient | undefined; //eslint-disable-line
}

import { PrismaClient } from "@prisma/client";
let db: PrismaClient;

if (!global.__db) {
  global.__db = new PrismaClient();
}

db = global.__db; //eslint-disable-line

export default db;

/*
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };
  
  const prisma = globalForPrisma.prisma ?? new PrismaClient();
  
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
  
  */
