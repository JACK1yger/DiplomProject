const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Post = sequelize.define("Post", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});

module.exports = Post;