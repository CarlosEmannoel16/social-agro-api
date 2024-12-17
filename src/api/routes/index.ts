import { Express } from "express";
import express from "express";
import upload from "../../config/upload";
import { middlewareAdapter } from "./@shared/middlewareAdpter";
import { makeMiddlewareAuth } from "@/presetation/middleware/MiddlewareAuthFactory";
import CreateUserUseCase from "@/usecase/user/create/CreateUseUseCase";
import UserRepository from "@/infra/repository/user/UserRepository";
import { CreateUserController } from "@/presetation/controllers/user/CreateUserController";
import FindUserUseCase from "@/usecase/user/find/FindUserUsecase";
import { FindUserController } from "@/presetation/controllers/user/FindUserController";
import { AuthUseCase } from "@/usecase/auth/auth";
import { AuthenticationController } from "@/presetation/controllers/authentication/AuthenticationController";
import { AnimalRepository } from "@/infra/repository/animal/AnimalRepository";
import { CreateAnimalUseCase } from "@/usecase/animal/create/CreateAnimalUseCase";
import { CreateAnimalController } from "@/presetation/controllers/animal/CreateAnimalController";
import { FindAllAnimalsUseCase } from "@/usecase/animal/findAll/FindAllAnimalsUseCase";
import { FindAllAnimalsController } from "@/presetation/controllers/animal/FindAllAnimalsController";
import { FindAnimalController } from "@/presetation/controllers/animal/FindAnimalController";
import { FindAnimalUseCase } from "@/usecase/animal/find/FindAnimalUseCase";
import { SearchAnimalUseCase } from "@/usecase/animal/search/SearchAnimalUseCase";
import { SearchAnimalController } from "@/presetation/controllers/animal/SearchAnimalController";
import { AddWeightAnimalController } from "@/presetation/controllers/animal/AddWeightAnimalController";
import { AddWeightAnimalUseCase } from "@/usecase/animal/addWeight/AddWeigthUseCase";
import { MilkProductionRepository } from "@/infra/repository/milkProduction/MilkProductionRepository";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";
import { AddMilkProductionAnimalController } from "@/presetation/controllers/animal/AddMilkProductionAnimalController";

const auth = middlewareAdapter(makeMiddlewareAuth());

export const routes = (app: Express) => {
  const router = express.Router();
  app.get("/", (_, res) => res.send("."));

  router.post("/auth", (req, res) => {
    const createUserUseCase = new AuthUseCase(new UserRepository());
    new AuthenticationController(createUserUseCase).handle(req, res);
  });

  //User routes

  router.get("/user/:id", auth, (req, res) => {
    const findUserUseCase = new FindUserUseCase(new UserRepository());
    new FindUserController(findUserUseCase).handle(req, res);
  });

  router.post("/user/register", (req, res) => {
    const createUserUseCase = new CreateUserUseCase(new UserRepository());
    return new CreateUserController(createUserUseCase);
  });

  //Animal routes
  router.post("/animal", auth, upload.single("file"), (req, res) => {
    const createAnimalUseCase = new CreateAnimalUseCase(
      new AnimalRepository(),
      new UserRepository()
    );
    new CreateAnimalController(createAnimalUseCase).handle(req, res);
  });

  router.get("/animal/all/:idUser", auth, (req, res) => {
   
    new FindAllAnimalsController(
      new FindAllAnimalsUseCase(new AnimalRepository())
    ).handle(req, res);
  });

  router.get("/animal/:id", auth, (req, res) => {
    new FindAnimalController(
      new FindAnimalUseCase(new AnimalRepository())
    ).handle(req, res);
  });

  router.get("/animal/search/:params/:idUser", auth, (req, res) => {
    new SearchAnimalController(
      new SearchAnimalUseCase(new AnimalRepository())
    ).handle(req, res);
  });

  router.post("/animal/add-weight", auth, (req, res) => {
    new AddWeightAnimalController(
      new AddWeightAnimalUseCase(new AnimalRepository())
    ).handle(req, res);
  });

  router.post("/animal/add-milk-production", auth, (req, res) => {
    const addMilkProductionUseCase = new AddMilkProductionUseCase(
      new AnimalRepository(),
      new MilkProductionRepository()
    );

    new AddMilkProductionAnimalController(addMilkProductionUseCase).handle(
      req,
      res
    );
  });
  //router.put("/:id/add-image", routeAdapter(makeCreateAnimalController()));

  // Dashboard routes
  router.get("/dashboard", auth, (req, res) => {
    
  });

  app.use(router);
};
