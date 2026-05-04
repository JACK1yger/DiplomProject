const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/file.controller");

// 🔥 нормальный storage с расширением
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .png .jpg .jpeg
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// 📂 routes
router.get("/", auth, controller.getAll);
router.post("/upload", auth, upload.single("file"), controller.upload);

module.exports = router;