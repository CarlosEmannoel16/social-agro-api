import { Express } from "express";
import { userRouter } from "./UserRouter";
import { animalRouter } from "./AnimalRouter";
import { middlewareAdapter } from "./@shared/middlewareAdpter";
import { makeMiddlewareAuth } from "../../presetation/middleware/MiddlewareAuthFactory";
import { authRouter } from "./AuthRouter";

export const routes = (app: Express) => {
  app.get("/", (_, res)=> res.send("."))
  app.use("/user",  userRouter);
  app.use("/animal", animalRouter);
  app.use("/authenticate", authRouter);
};
