const router = require("express").Router();

const controller = require("../controllers/posts.controller");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin");

// GET ALL POSTS
router.get("/", auth, controller.getAll);

// CREATE POST
router.post("/", auth, controller.create);

// UPDATE POST
router.put("/:id", auth, controller.update);

// DELETE POST
router.delete("/:id", auth, controller.remove);

module.exports = router;