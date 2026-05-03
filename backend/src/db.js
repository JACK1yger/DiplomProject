const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "cms",
  "admin",
  "1234",
  {
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;