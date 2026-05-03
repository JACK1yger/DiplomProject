const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./db");

const authRoutes = require("./routes/auth.routes");
const fileRoutes = require("./routes/file.routes");
const postsRoutes = require("./routes/posts.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/files", fileRoutes);
app.use("/posts", postsRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

// 💣 ВАЖНО: синхронизация БД перед запуском сервера
sequelize.sync().then(() => {
  console.log("DB connected");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});