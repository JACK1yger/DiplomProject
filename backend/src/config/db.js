const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "cms",
  process.env.DB_USER || "admin",
  process.env.DB_PASS || "1234",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    // ⚠️ ВАЖНО: без alter и force
    await sequelize.sync();
    console.log("DB synced");
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

module.exports = sequelize;