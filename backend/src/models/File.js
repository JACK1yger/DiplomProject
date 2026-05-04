const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const File = sequelize.define("File", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  path: DataTypes.STRING,
  ownerId: DataTypes.INTEGER,
});

module.exports = File;