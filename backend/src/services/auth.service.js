const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateToken } = require("../utils/jwt");

exports.register = async (email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      role: "USER",
    },
  });

  // ВАЖНО: не отдаём пароль в токен
  return generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
};

exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Wrong password");
  }

  // чистый payload без пароля
  return generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
};