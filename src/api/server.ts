import "reflect-metadata";
import dotenv from "dotenv";
import  app from "./express";
import logger from "@/infra/logger/logger";

dotenv.config();

const port = Number(process.env.PORT || 3000);

app.listen(port, () => logger.info(`Server running on port ${port}`));
