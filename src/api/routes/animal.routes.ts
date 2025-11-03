import upload from "@/config/upload";
import { AnimalRepository } from "@/infra/repository/AnimalRepository";
import { MilkProductionRepository } from "@/infra/repository/MilkProductionRepository";
import UserRepository from "@/infra/repository/UserRepository";
import { AddMilkProductionAnimalController } from "@/presetation/controllers/animal/AddMilkProductionAnimalController";
import { CreateAnimalController } from "@/presetation/controllers/animal/CreateAnimalController";
import { DeleteAnimalController } from "@/presetation/controllers/animal/DeleteAnimalController";
import { DeleteMilkProductionByIdController } from "@/presetation/controllers/animal/DeleteMilkProductionController";
import { FindAllAnimalsController } from "@/presetation/controllers/animal/FindAllAnimalsController";
import { FindAnimalController } from "@/presetation/controllers/animal/FindAnimalController";
import { FindMilkProductionByIdController } from "@/presetation/controllers/animal/FindMilkProductionController";
import { SearchAnimalController } from "@/presetation/controllers/animal/SearchAnimalController";
import { UpdateAnimalController } from "@/presetation/controllers/animal/UpdateAnimalController";
import { UpdateMilkProductionAnimalController } from "@/presetation/controllers/animal/UpdateMilkProductionAnimalController";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";
import { CreateAnimalUseCase } from "@/usecase/animal/create/CreateAnimalUseCase";
import { DeleteAnimalUseCase } from "@/usecase/animal/delete/DeleteAnimalUseCase";
import { DeleteMilkProductionUseCase } from "@/usecase/animal/deleteMilkProduction/DeleteMilkProductionUseCase";
import { FindAnimalUseCase } from "@/usecase/animal/find/FindAnimalUseCase";
import { FindAllAnimalsUseCase } from "@/usecase/animal/findAll/FindAllAnimalsUseCase";
import { FindMilkProductionUseCase } from "@/usecase/animal/findMilkProduction/FindMilkProductionUseCase";
import { SearchAnimalUseCase } from "@/usecase/animal/search/SearchAnimalUseCase";
import { UpdateAnimalUseCase } from "@/usecase/animal/updateAnimal/UpdateAnimalUseCase";
import { UpdateMilkProductionUseCase } from "@/usecase/animal/updateMilkProduction/UpdateMilkProductionUseCase";
import { Router } from "express";

const userRepository = new UserRepository();
const animalRepository = new AnimalRepository();

export const animalRoutes = (router: Router) => {
  router.post("/animal", upload.single("file"), (req, res, next) => {
    const createAnimalUseCase = new CreateAnimalUseCase(
      animalRepository,
      userRepository
    );
    new CreateAnimalController(createAnimalUseCase).handle(req, res, next);
  });

  router.get("/animal/all", (req, res, next) => {
    new FindAllAnimalsController(
      new FindAllAnimalsUseCase(animalRepository)
    ).handle(req, res, next);
  });

  router.get("/animal/:id", (req, res, next) => {
    new FindAnimalController(new FindAnimalUseCase(animalRepository)).handle(
      req,
      res,
      next
    );
  });

  router.get("/animal/search/:params", (req, res, next) => {
    new SearchAnimalController(
      new SearchAnimalUseCase(animalRepository)
    ).handle(req, res, next);
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

  router.post("/milk-production/add", (req, res, next) => {
    return new AddMilkProductionAnimalController(
      new AddMilkProductionUseCase(
        animalRepository,
        new MilkProductionRepository()
      )
    ).handle(req, res, next);
  });

  router.put("/milk-production", (req, res, next) => {
    return new UpdateMilkProductionAnimalController(
      new UpdateMilkProductionUseCase(
        animalRepository,
        new MilkProductionRepository()
      )
    ).handle(req, res, next);
  });

  router.get("/milk-production/:id", (req, res, next) => {
    return new FindMilkProductionByIdController(
      new FindMilkProductionUseCase(
        animalRepository,
        new MilkProductionRepository()
      )
    ).handle(req, res, next);
  });

  router.delete("/milk-production/:id", (req, res, next) => {
    return new DeleteMilkProductionByIdController(
      new DeleteMilkProductionUseCase(
        new MilkProductionRepository(),
      )
    ).handle(req, res, next);
  });
};
