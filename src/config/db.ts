import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize({
    dialect: process.env.DB_CONN as Dialect,
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    dialectOptions: process.env.DB_SSL
        ? {
              ssl: {
                  require: process.env.DB_SSL === "true",
              },
          }
        : {},
    models: [__dirname + "/../models/**/*"],
    logging: false,
});

export default db;
