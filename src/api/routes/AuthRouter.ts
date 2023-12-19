import express from "express";
import { routeAdapter } from "./@shared/routeAdptar";
import { makeAuthenticationControllerController } from "../../main/factories/controller/auth/AuthControllerFactory";

const authRouter = express.Router();
authRouter.post("/", routeAdapter(makeAuthenticationControllerController()));



export { authRouter };
