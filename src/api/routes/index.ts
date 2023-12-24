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

export const routes = (app: Express) => {
  const router = express.Router();
  app.get("/", (_, res) => res.send("."));

  router.post("/authenticate", routeAdapter(makeAuthenticationControllerController()));

  //User routes
  router.post(
    "/user",
    upload.single("profileImage"),
    routeAdapter(makeCreateUserController())
  );
  router.get("/user/:id", routeAdapter(makeFindUserController()));

  
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
  //router.patch("/add-weight", routeAdapter(makeCreateAnimalController()));
  //router.put("/:id/add-image", routeAdapter(makeCreateAnimalController()));

  app.use(router);
};
