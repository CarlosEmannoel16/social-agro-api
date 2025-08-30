import { Router } from "express";
import { DeleteAnimalWeighController } from "@/presetation/controllers/weight/DeleteAnimalWeightController";
import { UpdateAnimalWeightController } from "@/presetation/controllers/weight/UpdateAnimalWeightController";
import { AddWeighAnimalController } from "@/presetation/controllers/animal/AddWeighAnimalController";
import { FindWeighByIdController } from "@/presetation/controllers/weight/FindWeightByIdController";
import { HistoryWeightRepository } from "@/infra/repository/historyWeight/HistoryWeightRepository";
import { FindWeightByIdUseCase } from "@/usecase/weight/findById/FindWeightAnimalByIdUseCase";
import { DeleteAnimalWeightUseCase } from "@/usecase/weight/delete/DeleteAnimalWeightUseCase";
import { EditAnimalWeightUseCase } from "@/usecase/weight/edit/EditAnimalWeightUseCase";
import { AddWeightAnimalUseCase } from "@/usecase/weight/addWeight/AddWeightUseCase";

const historyWeighRepository = new HistoryWeightRepository();
export const weightRoutes = (router: Router) => {
  router.post("/animal/weight/add", (req, res, next) => {
    return new AddWeighAnimalController(
      new AddWeightAnimalUseCase(historyWeighRepository)
    ).handle(req, res, next);
  });

  router.get("/animal/weight/:id", (req, res, next) => {
    return new FindWeighByIdController(
      new FindWeightByIdUseCase(historyWeighRepository)
    ).handle(req, res, next);
  });

  router.delete("/animal/weight/delete/:animalId", (req, res, next) => {
    return new DeleteAnimalWeighController(
      new DeleteAnimalWeightUseCase(historyWeighRepository)
    ).handle(req, res, next);
  });

  router.put("/animal/weight/:animalId", (req, res, next) => {
    return new UpdateAnimalWeightController(
      new EditAnimalWeightUseCase(historyWeighRepository)
    ).handle(req, res, next);
  });
};
