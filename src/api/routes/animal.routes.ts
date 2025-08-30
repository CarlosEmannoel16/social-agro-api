import upload from "@/config/upload";
import { AnimalRepository } from "@/infra/repository/animal/AnimalRepository";
import { HistoryWeighRepository } from "@/infra/repository/historyWeigh/HistoryWeighRepository";
import { MilkProductionRepository } from "@/infra/repository/milkProduction/MilkProductionRepository";
import UserRepository from "@/infra/repository/user/UserRepository";
import { AddMilkProductionAnimalController } from "@/presetation/controllers/animal/AddMilkProductionAnimalController";
import { CreateAnimalController } from "@/presetation/controllers/animal/CreateAnimalController";
import { DeleteAnimalController } from "@/presetation/controllers/animal/DeleteAnimalController";
import { FindAllAnimalsController } from "@/presetation/controllers/animal/FindAllAnimalsController";
import { FindAnimalController } from "@/presetation/controllers/animal/FindAnimalController";
import { SearchAnimalController } from "@/presetation/controllers/animal/SearchAnimalController";
import { UpdateAnimalController } from "@/presetation/controllers/animal/UpdateAnimalController";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";
import { CreateAnimalUseCase } from "@/usecase/animal/create/CreateAnimalUseCase";
import { DeleteAnimalUseCase } from "@/usecase/animal/delete/DeleteAnimalUseCase";
import { FindAnimalUseCase } from "@/usecase/animal/find/FindAnimalUseCase";
import { FindAllAnimalsUseCase } from "@/usecase/animal/findAll/FindAllAnimalsUseCase";
import { SearchAnimalUseCase } from "@/usecase/animal/search/SearchAnimalUseCase";
import { UpdateAnimalUseCase } from "@/usecase/animal/updateAnimal/UpdateAnimalUseCase";
import { Router } from "express";

const userRepository = new UserRepository();
const animalRepository = new AnimalRepository();
const historyWeighRepository = new HistoryWeighRepository();

export const animalRoutes = (router: Router) => {
  router.post("/animal", upload.single("file"), (req, res) => {
    const createAnimalUseCase = new CreateAnimalUseCase(
      animalRepository,
      userRepository
    );
    new CreateAnimalController(createAnimalUseCase).handle(req, res);
  });

  router.get("/animal/all", (req, res) => {
    new FindAllAnimalsController(
      new FindAllAnimalsUseCase(animalRepository)
    ).handle(req, res);
  });

  router.get("/animal/:id", (req, res) => {
    new FindAnimalController(new FindAnimalUseCase(animalRepository)).handle(
      req,
      res
    );
  });

  router.get("/animal/search/:params", (req, res) => {
    new SearchAnimalController(
      new SearchAnimalUseCase(animalRepository)
    ).handle(req, res);
  });

  

  router.put("/animal", upload.single("file"), (req, res, next) => {
    return new UpdateAnimalController(
      new UpdateAnimalUseCase(animalRepository)
    ).handle(req, res, next);
  });

  router.delete("/animal/:id", (req, res, next) => {
    return new DeleteAnimalController(
      new DeleteAnimalUseCase(animalRepository)
    ).handle(req, res, next);
  });

  router.post("/animal/milk/add", (req, res) => {
    return new AddMilkProductionAnimalController(
      new AddMilkProductionUseCase(
        animalRepository,
        new MilkProductionRepository()
      )
    ).handle(req, res);
  });
};
