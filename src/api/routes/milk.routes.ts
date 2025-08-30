import { FindLastMilkPriceController } from "@/presetation/controllers/milkPrice/FindLastMilkPriceController";
import { FindAllMilkPriceController } from "@/presetation/controllers/milkPrice/FindAllMilkPriceController";
import { CreateMilkPriceController } from "@/presetation/controllers/milkPrice/CreateMilPriceController";
import { MilkPriceRepository } from "@/infra/repository/MilkPriceRepository";
import { FindLastMilkPriceUseCase } from "@/usecase/milkPrice/FindCurrentMilkPriceUseCase";
import { CreateMilkPriceUseCase } from "@/usecase/milkPrice/CreateMilkPriceUseCase";
import { FindMilkPriceUseCase } from "@/usecase/milkPrice/FindMilkPriceUseCase";
import { Router } from "express";

const milkRepository = new MilkPriceRepository();

export const milkRoutes = (router: Router) => {
  router.get("/milk/price", (req, res, next) => {
    return new FindAllMilkPriceController(
      new FindMilkPriceUseCase(milkRepository)
    ).handle(req, res, next);
  });

  router.get("/milk/price/last", (req, res, next) => {
    return new FindLastMilkPriceController(
      new FindLastMilkPriceUseCase(milkRepository)
    ).handle(req, res, next);
  });

  router.post("/milk/price", (req, res, next) => {
    return new CreateMilkPriceController(
      new CreateMilkPriceUseCase(milkRepository)
    ).handle(req, res, next);
  });
};
