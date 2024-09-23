import "reflect-metadata";
import { DatabaseInitializer } from "../loaders/database";
import dotenv from "dotenv";
import { app } from "./express";
import { routes } from "./routes";
import { Logger } from "@/infra/shared/logger/Logger";
dotenv.config();

const port = Number(process.env.PORT || 3000);
routes(app);
DatabaseInitializer.instance().init()
app.listen(port, () => Logger.info(`Server runing in port ${port}`))
