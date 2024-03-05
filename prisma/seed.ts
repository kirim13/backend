import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const john = await prisma.user.upsert({
    where: { email: "johnsmith@prisma.io" },
    update: {},
    create: {
      id: "clte5s2lp0000st8dcrhqf8jt",
      username: "johnsmith1",
      firstName: "John",
      lastName: "Smith",
      email: "johnsmith1@prisma.io",
      password: "password",
    },
  });

  const mary = await prisma.user.upsert({
    where: { email: "marysmith@prisma.io" },
    update: {},
    create: {
      id: "clte5s2ly0001st8dmvgw34i0",
      username: "marysmith1",
      firstName: "Mary",
      lastName: "Smith",
      email: "marysmith1@prisma.io",
      password: "password",
    },
  });

  const toast = await prisma.pet.upsert({
    where: { id: "clte5y7f6000113wkfx3ujf4h" },
    update: {},
    create: {
      id: "clte5y7f6000113wkfx3ujf4h",
      firstName: "Toasty",
      lastName: "Smithy",
      breed: "Bengal",
      type: "CAT",
      birthday: "02-12-2013",
      gotchaDate: "02-12-2013",
      primaryOwnerId: "clte5s2lp0000st8dcrhqf8jt",
    },
  });

  console.log({ john, mary, toast });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
