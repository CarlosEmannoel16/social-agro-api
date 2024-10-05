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
import { makeAddMilkProductionController } from "@/main/factories/controller/animal/AddMilkProductionControllerFactory";

const auth = middlewareAdapter(makeMiddlewareAuth());

export const routes = (app: Express) => {
  const router = express.Router();
  app.get("/", (_, res) => res.send("."));

  router.post("/auth", routeAdapter(makeAuthenticationControllerController()));

  //User routes
  router.post(
    "/user",
    auth,
    upload.single("profileImage"),
    routeAdapter(makeCreateUserController())
  );
  router.get(
    "/user/:id",
    auth,
    routeAdapter(makeFindUserController())
  );
  router.post("/user/register", routeAdapter(makeCreateUserController()));

  //Animal routes
  router.post(
    "/animal",
    auth,
    upload.single("file"),
    routeAdapter(makeCreateAnimalController())
  );

  router.get(
    "/animal/all/:idUser",
    auth,
    routeAdapter(makeFindAllAnimalController())
  );
  router.get(
    "/animal/:id",
    auth,
    routeAdapter(makeFindAnimalController())
  );
  router.get(
    "/animal/search/:params/:idUser",
    auth,
    routeAdapter(makeSearchAnimalController())
  );
  router.post(
    "/animal/add-weight",
    auth,
    routeAdapter(makeAddWeightAnimalController())
  );

  router.post(
    "/animal/add-milk-production",
    auth,
    routeAdapter(makeAddMilkProductionController())
  );
  //router.put("/:id/add-image", routeAdapter(makeCreateAnimalController()));

  app.use(router);
};
