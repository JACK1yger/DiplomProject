let posts = [];

exports.getAll = (req, res) => {
  res.json(posts);
};

exports.create = (req, res) => {
  const post = {
    id: Date.now(),
    title: req.body.title,
  };

  posts.push(post);
  res.json(post);
};

exports.remove = (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.json({ ok: true });
};