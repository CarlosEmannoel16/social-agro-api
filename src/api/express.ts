import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import publicRoutes from "./routes/public.routes";
import privateRoutes from "./routes/private.routes";
import morgan from "morgan";
import { ErrorMiddleware } from "./middlewares/ErrorMiddleware";
import { UserAuthMiddleware } from "./middlewares/UserMiddleware";
import UserRepository from "@/infra/repository/UserRepository";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/images", express.static(__dirname + "/../uploads"));

const specs = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Agro Api",
      version: "1.0.0",
    },
  },
  apis: ["src/api/routes/*.ts", "src/api/swaggerDoc.yaml"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const auth = new UserAuthMiddleware(new UserRepository()).execute;

app.use(publicRoutes);
app.use(auth, privateRoutes);

// Middleware de erro
const errorMiddleware = new ErrorMiddleware();
app.use(errorMiddleware.execute);

export default app;
