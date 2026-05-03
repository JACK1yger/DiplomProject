const router = require("express").Router();
const multer = require("multer");
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/file.controller");

const upload = multer({ dest: "uploads/" });

router.get("/", auth, controller.getAll);
router.post("/upload", auth, upload.single("file"), controller.upload);
router.get("/", auth, controller.getAll);
router.post("/upload", auth, upload.single("file"), controller.upload);

module.exports = router;