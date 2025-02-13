import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const seededCategoriesIndatabase = async () => {
  try {
  const category =  await database.category.createMany({
      data: [
        { name: "software engineering" },
        { name: "Accounting" },
        { name: "maths" },
        { name: "bachelor" },
      ],
    });

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await database.$disconnect();
  }
};

seededCategoriesIndatabase();
