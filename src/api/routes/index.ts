import { Express } from "express";
import express from "express";
import { routeAdapter } from "./@shared/routeAdptar";
import { makeFindAllAnimalController } from "../../main/factories/controller/animal/FindAllAnimalControllerFactory";
import upload from "../../config/upload";
import { makeCreateUserController } from "../../main/factories/controller/user/CreateUserControllerFactory";
import { makeFindUserController } from "../../main/factories/controller/user/FindUserControllerFactory";
import { makeCreateAnimalController } from "../../main/factories/controller/animal/CreateAnimalControllerFactory";
import { makeFindAnimalController } from "../../main/factories/controller/animal/FindAnimalControllerFactory";
import { makeAuthenticationControllerController } from "../../main/factories/controller/auth/AuthControllerFactory";
import { makeSearchAnimalController } from "../../main/factories/controller/animal/SerachAnimalControllerFactory";
import { makeAddWeightAnimalController } from "../../main/factories/controller/animal/AddWeightAnimalControllerFactory";
import { middlewareAdapter } from "./@shared/middlewareAdpter";
import { makeMiddlewareAuth } from "@/presetation/middleware/MiddlewareAuthFactory";

export const routes = (app: Express) => {
  const router = express.Router();
  app.get("/", (_, res) => res.send("."));

  router.post("/auth", routeAdapter(makeAuthenticationControllerController()));

  //User routes
  router.post(
    "/user",
    upload.single("profileImage"),
    routeAdapter(makeCreateUserController())
  );
  router.get("/user/:id", middlewareAdapter(makeMiddlewareAuth()), routeAdapter(makeFindUserController()));
  router.post("/user/register", routeAdapter(makeCreateUserController()));

  
  //Animal routes
  router.post(
    "/animal",
    upload.single("file"),
    routeAdapter(makeCreateAnimalController())
  );

  router.get(
    "/animal/all/:idUser",
    routeAdapter(makeFindAllAnimalController())
  );
  router.get("/animal/:id", routeAdapter(makeFindAnimalController()));
  router.get("/animal/search/:params/:idUser", routeAdapter(makeSearchAnimalController()));
  router.patch("/animal/add-weight", routeAdapter(makeAddWeightAnimalController()));
  //router.put("/:id/add-image", routeAdapter(makeCreateAnimalController()));

  app.use(router);
};
