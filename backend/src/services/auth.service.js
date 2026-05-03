const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

exports.register = async (email, password) => {
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hash,
    role: "USER",
  });

  return generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
};

exports.login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Wrong password");
  }

  return generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
};