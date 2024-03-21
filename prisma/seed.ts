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

  const medicineTest = await prisma.notification.upsert({
    where: { id: "cltq80tl50000u4vy55r7ge4y" },
    update: {},
    create: {
      id: "cltq80tl50000u4vy55r7ge4y",
      type: "Medicine",
      name: "Advil",
      quantity: 1,
      unit: "Tablet",
      notes: "",
      photos: "",
      dosageQuantity: 1,
      dosageUnit: "mg",
      frequencyQuantity: 1,
      frequencyUnit: "Daily",
      date: "2024-03-14",
      day: ["Tuesday"],
      time: ["00:55"],
      endDate: "2024-03-14",
      repeating: ["Daily"],
      createdAt: "2024-03-13T19:55:29.544Z",
      imageSrc: "",
      completed: false,
      userId: "clte5s2lp0000st8dcrhqf8jt",
      petId: "clte5y7f6000113wkfx3ujf4h",
    },
  });

  const foodTest = await prisma.notification.upsert({
    where: { id: "cltqepwj00000cmmqwpfoktjj" },
    update: {},
    create: {
      id: "cltqepwj00000cmmqwpfoktjj",
      type: "Food",
      name: "Blue Buffalo",
      quantity: 2,
      unit: "Cups",
      notes: "",
      photos: "",
      dosageQuantity: 0,
      dosageUnit: null,
      frequencyQuantity: 0,
      frequencyUnit: null,
      date: "2024-03-19",
      day: ["Monday"],
      time: ["04:02"],
      endDate: "2024-03-23",
      repeating: ["Weekly"],
      createdAt: "2024-03-13T23:02:57.440Z",
      imageSrc: "",
      completed: false,
      userId: "clte5s2lp0000st8dcrhqf8jt",
      petId: "clte5y7f6000113wkfx3ujf4h",
    },
  });

  console.log({ john, mary, toast, medicineTest, foodTest });
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
