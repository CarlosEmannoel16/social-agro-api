import { Router } from "express";
import { DeleteAnimalWeighController } from "@/presetation/controllers/weigh/DeleteAnimalWeighController";
import { UpdateAnimalWeighController } from "@/presetation/controllers/weigh/UpdateAnimalWeighController";
import { AddWeighAnimalController } from "@/presetation/controllers/animal/AddWeighAnimalController";
import { FindWeighByIdController } from "@/presetation/controllers/weigh/FindWeighByIdController";
import { HistoryWeighRepository } from "@/infra/repository/historyWeigh/HistoryWeighRepository";
import { FindWeighByIdUseCase } from "@/usecase/weigh/findById/FindWeightAnimalByIdUseCase";
import { DeleteAnimalWeighUseCase } from "@/usecase/weigh/delete/DeleteAnimalWeighUseCase";
import { EditAnimalWeighUseCase } from "@/usecase/weigh/edit/EditAnimalWeighUseCase";
import { AddWeighAnimalUseCase } from "@/usecase/animal/addWeigh/AddWeighUseCase";

const historyWeighRepository = new HistoryWeighRepository();
export const weightRoutes = (router: Router) => {
  router.post("/animal/weight/add", (req, res, next) => {
    return new AddWeighAnimalController(
      new AddWeighAnimalUseCase(historyWeighRepository)
    ).handle(req, res, next);
  });

  router.get("/animal/weight/:id", (req, res, next) => {
    return new FindWeighByIdController(
      new FindWeighByIdUseCase(historyWeighRepository)
    ).handle(req, res, next);
  });

  router.delete("/animal/weight/delete/:animalId", (req, res, next) => {
    return new DeleteAnimalWeighController(
      new DeleteAnimalWeighUseCase(historyWeighRepository)
    ).handle(req, res, next);
  });

  router.put("/animal/weight/:animalId", (req, res, next) => {
    return new UpdateAnimalWeighController(
      new EditAnimalWeighUseCase(historyWeighRepository)
    ).handle(req, res, next);
  });
};
