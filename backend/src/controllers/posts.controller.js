const Post = require("../models/Post");

// 📥 получить все посты
exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: "Fetch error" });
  }
};

// ➕ создать пост
exports.create = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image || null, // 👈 ВАЖНО
      userId: req.user?.id || null,
    });

    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Create error" });
  }
};

// ✏️ обновить пост
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.update({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    });

    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Update error" });
  }
};

// 🗑 удалить пост
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: "Delete error" });
  }
};