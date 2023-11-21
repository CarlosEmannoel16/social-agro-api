import { Express } from "express";
import { userRouter } from "./UserRouter";
import { animalRouter } from "./AnimalRouter";

export const routes = (app: Express) => {
  app.use("/user", userRouter);
  app.use("/animal", animalRouter);
};
