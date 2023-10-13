import { Sequelize } from "sequelize";
export default new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
