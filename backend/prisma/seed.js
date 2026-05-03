const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("1234", 10);

  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: hash,
      role: "ADMIN",
    },
  });

  console.log("Test user created");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });