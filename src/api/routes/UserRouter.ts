import express from "express";
import { routeAdapter } from "./@shared/routeAdptar";
import { makeCreateUserController } from "../../main/factories/controller/user/CreateUserControllerFactory";

const userRouter = express.Router();

userRouter.post("/", routeAdapter(makeCreateUserController()));

export { userRouter };
