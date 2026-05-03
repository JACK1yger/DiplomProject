const Post = require("../models/Post");

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: "Fetch error" });
  }
};

exports.create = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Create error" });
  }
};

exports.update = async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    res.json({ ok: true, result: post });
  } catch (e) {
    res.status(500).json({ message: "Update error" });
  }
};

exports.remove = async (req, res) => {
  try {
    await Post.destroy({
      where: { id: req.params.id },
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: "Delete error" });
  }
};