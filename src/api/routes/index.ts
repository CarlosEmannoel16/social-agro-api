import { Express } from "express";
import express from "express";
import upload from "../../config/upload";
import UserRepository from "@/infra/repository/user/UserRepository";
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
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";
import { AddMilkProductionAnimalController } from "@/presetation/controllers/animal/AddMilkProductionAnimalController";
import { FindAllMilkPriceController } from "@/presetation/controllers/milkPrice/FindAllMilkPriceController";
import { FindMilkPriceUseCase } from "@/usecase/milkPrice/FindMilkPriceUseCase";
import { MilkPriceRepository } from "@/infra/repository/milkPrice/MilkPriceRepository";
import { CreateMilkPriceController } from "@/presetation/controllers/milkPrice/CreateMilPriceController";
import { CreateMilkPriceUseCase } from "@/usecase/milkPrice/CreateMilkPriceUseCase";
import { FindLastMilkPriceController } from "@/presetation/controllers/milkPrice/FindLastMilkPriceController";
import { FindLastMilkPriceUseCase } from "@/usecase/milkPrice/FindCurrentMilkPriceUseCase";
import { AddImageAnimalUseCase } from "@/usecase/animal/addImage/AddImageAnimalUseCase";
import { MilkProductionRepository } from "@/infra/repository/milkProduction/MilkProductionRepository";
import { UpdateAnimalController } from "@/presetation/controllers/animal/UpdateAnimalController";
import { UpdateAnimalUseCase } from "@/usecase/animal/updateAnimal/UpdateAnimalUseCase";
import { DeleteAnimalController } from "@/presetation/controllers/animal/DeleteAnimalController";
import { DeleteAnimalUseCase } from "@/usecase/animal/delete/DeleteAnimalUseCase";
import { InitialDashboardController } from "@/presetation/controllers/dashboard/initialDashboardController";
import { InitialDashboardUseCase } from "@/usecase/dashboard/InitialDashboardUseCase";
import { UserAuthMiddleware } from "../middlewares/UserMiddleware";
import { UpdateUserUseCase } from "@/usecase/user/update/UpdateUseCase";
import { UpdateUserController } from "@/presetation/controllers/user/UpdateUserController";

// const auth = middlewareAdapter(makeMiddlewareAuth());

// Repositories
const animalRepository = new AnimalRepository();
const userRepository = new UserRepository();

export const routes = (app: Express) => {
  const auth = new UserAuthMiddleware(userRepository).execute;

  const router = express.Router();
  app.get("/", (_, res) => res.send("."));

  router.post("/auth", (req, res) => {
    const createUserUseCase = new AuthUseCase(userRepository);
    new AuthenticationController(createUserUseCase).handle(req, res);
  });

  //User routes

  router.get("/user/:id", auth, (req, res) => {
    const findUserUseCase = new FindUserUseCase(new UserRepository());
    new FindUserController(findUserUseCase).handle(req, res);
  });

  router.put("/user", auth, upload.single("file"), (req, res) => {
    const updateUserUseCase = new UpdateUserUseCase(new UserRepository());
    new UpdateUserController(updateUserUseCase).handle(req, res);
  });

  //Animal routes
  router.post("/animal", auth, upload.single("file"), (req, res) => {
    const createAnimalUseCase = new CreateAnimalUseCase(
      animalRepository,
      new UserRepository()
    );
    new CreateAnimalController(createAnimalUseCase).handle(req, res);
  });

  router.get("/animal/all", auth, (req, res) => {
    new FindAllAnimalsController(
      new FindAllAnimalsUseCase(animalRepository)
    ).handle(req, res);
  });

  router.get("/animal/:id", auth, (req, res) => {
    new FindAnimalController(new FindAnimalUseCase(animalRepository)).handle(
      req,
      res
    );
  });

  router.get("/animal/search/:params", auth, (req, res) => {
    new SearchAnimalController(
      new SearchAnimalUseCase(animalRepository)
    ).handle(req, res);
  });

  router.post("/animal/add-weight", auth, (req, res) => {
    new AddWeightAnimalController(
      new AddWeightAnimalUseCase(animalRepository)
    ).handle(req, res);
  });

  router.put("/animal", auth, upload.single("file"), (req, res, next) => {
    return new UpdateAnimalController(
      new UpdateAnimalUseCase(animalRepository)
    ).handle(req, res, next);
  });

  router.delete("/animal/:id", auth, (req, res, next) => {
    return new DeleteAnimalController(
      new DeleteAnimalUseCase(animalRepository)
    ).handle(req, res, next);
  });

  router.post("/animal/milk/add", auth, (req, res) => {
    return new AddMilkProductionAnimalController(
      new AddMilkProductionUseCase(
        animalRepository,
        new MilkProductionRepository()
      )
    ).handle(req, res);
  });

  //router.put("/:id/add-image", routeAdapter(makeCreateAnimalController()));

  // Dashboard routes
  router.get("/dashboard", auth, (req, res, next) => {
    return new InitialDashboardController(
      new InitialDashboardUseCase(new AnimalRepository())
    ).handle(req, res, next);
  });

  // Milk Price
  router.get("/milk/price", auth, (req, res) => {
    return new FindAllMilkPriceController(
      new FindMilkPriceUseCase(new MilkPriceRepository())
    ).handle(req, res);
  });

  router.get("/milk/price/last", auth, (req, res) => {
    return new FindLastMilkPriceController(
      new FindLastMilkPriceUseCase(new MilkPriceRepository())
    ).handle(req, res);
  });

  router.post("/milk/price", auth, (req, res) => {
    return new CreateMilkPriceController(
      new CreateMilkPriceUseCase(new MilkPriceRepository())
    ).handle(req, res);
  });

  app.use(router);
};
