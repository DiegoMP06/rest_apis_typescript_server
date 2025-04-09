import express, { Express } from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

const ALLOWED_ORIGINS = [process.env.FRONTEND_URL || "http://localhost:5173"];

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.green.bold("Conectado a la base de datos"));
    } catch {
        console.error(
            colors.bgWhite.red.bold("Error al conectar a la base de datos")
        );
    }
}

connectDB();

const server: Express = express();

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (ALLOWED_ORIGINS.some((allowedOrigin) => allowedOrigin === origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

server.use(cors(corsOptions));

server.use(express.json());

server.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, swaggerUIOptions)
);

server.use(morgan("dev"))

server.use("/api/products", router);

export default server;
