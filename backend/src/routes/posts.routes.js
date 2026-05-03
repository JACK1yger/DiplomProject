const router = require("express").Router();
const controller = require("../controllers/posts.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, controller.getAll);
router.post("/", auth, controller.create);
router.delete("/:id", auth, controller.remove);
router.get("/", auth, controller.getAll);
router.post("/", auth, controller.create);
router.delete("/:id", auth, controller.remove);

module.exports = router;