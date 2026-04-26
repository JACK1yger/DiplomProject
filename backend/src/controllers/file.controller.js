const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.upload = async (req, res) => {
  const file = await prisma.file.create({
    data: {
      name: req.file.originalname,
      path: req.file.path,
      ownerId: req.user.id,
    },
  });

  res.json(file);
};

exports.getAll = async (req, res) => {
  const files = await prisma.file.findMany();
  res.json(files);
};