import { MilkPriceRepository } from "@/infra/repository/milkPrice/MilkPriceRepository";
import { CreateMilkPriceController } from "@/presetation/controllers/milkPrice/CreateMilPriceController";
import { FindAllMilkPriceController } from "@/presetation/controllers/milkPrice/FindAllMilkPriceController";
import { FindLastMilkPriceController } from "@/presetation/controllers/milkPrice/FindLastMilkPriceController";
import { CreateMilkPriceUseCase } from "@/usecase/milkPrice/CreateMilkPriceUseCase";
import { FindLastMilkPriceUseCase } from "@/usecase/milkPrice/FindCurrentMilkPriceUseCase";
import { FindMilkPriceUseCase } from "@/usecase/milkPrice/FindMilkPriceUseCase";
import { Router } from "express";

const milkRepository = new MilkPriceRepository();

export const milkRoutes = (router: Router) => {
  router.get("/milk/price", (req, res) => {
    return new FindAllMilkPriceController(
      new FindMilkPriceUseCase(milkRepository)
    ).handle(req, res);
  });

  router.get("/milk/price/last", (req, res) => {
    return new FindLastMilkPriceController(
      new FindLastMilkPriceUseCase(milkRepository)
    ).handle(req, res);
  });

  router.post("/milk/price", (req, res) => {
    return new CreateMilkPriceController(
      new CreateMilkPriceUseCase(milkRepository)
    ).handle(req, res);
  });
};
