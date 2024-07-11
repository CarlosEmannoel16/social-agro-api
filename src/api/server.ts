import "reflect-metadata";
import { DatabaseInitializer } from "../loaders/database";
import dotenv from "dotenv";
import { app } from "./express";
import { routes } from "./routes";
dotenv.config();

const port = Number(process.env.PORT || 3000);
routes(app);
DatabaseInitializer.instance().init()
app.listen(port, () => console.log(`Server runing in port ${port}`))
