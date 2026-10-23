const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

const poolConfig = {
  max: 20,
  min: 2,
  acquire: 30000,
  idle: 10000,
};

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    pool: poolConfig,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "backend",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "postgres",
    {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      dialect: "postgres",
      logging: false,
      pool: poolConfig,
    }
  );
}

module.exports = sequelize;
