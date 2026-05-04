const File = require("../models/File");

// 📤 upload file
exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = await File.create({
      name: req.file.originalname,

      // 🔥 ВСЕГДА один формат
      path: `uploads/${req.file.filename}`.replace(/\\/g, "/"),

      ownerId: req.user?.id || null,
    });

    res.json(file);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Upload error" });
  }
};

// 📥 get all files
exports.getAll = async (req, res) => {
  try {
    const files = await File.findAll({
      where: {
        ownerId: req.user?.id || null,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(files);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Fetch error" });
  }
};