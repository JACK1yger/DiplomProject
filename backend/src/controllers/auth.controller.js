const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const token = await authService.register(
      req.body.email,
      req.body.password
    );
    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.login(
      req.body.email,
      req.body.password
    );
    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};