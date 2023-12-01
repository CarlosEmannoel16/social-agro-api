import express from "express";
import { routeAdapter } from "./@shared/routeAdptar";
import { makeCreateUserController } from "../../main/factories/controller/user/CreateUserControllerFactory";
import { makeFindUserController } from "../../main/factories/controller/user/FindUserControllerFactory";
import upload from "../../config/upload";
const userRouter = express.Router();

userRouter.post(
  "/",
  upload.single("profileImage"),
  routeAdapter(makeCreateUserController())
);
userRouter.get("/user/:id", routeAdapter(makeFindUserController()));

export { userRouter };
