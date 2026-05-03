const File = require("../models/File");

exports.upload = async (req, res) => {
  try {
    const file = await File.create({
      name: req.file.originalname,
      path: req.file.path,
      ownerId: req.user.id,
    });

    res.json(file);
  } catch (e) {
    res.status(500).json({ message: "Upload error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const files = await File.findAll({
      where: {
        ownerId: req.user.id,
      },
    });

    res.json(files);
  } catch (e) {
    res.status(500).json({ message: "Fetch error" });
  }
};