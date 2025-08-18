import express from "express";
import { AnimalRepository } from "@/infra/repository/animal/AnimalRepository";
import { InitialDashboardController } from "@/presetation/controllers/dashboard/initialDashboardController";
import { InitialDashboardUseCase } from "@/usecase/dashboard/InitialDashboardUseCase";
import { animalRoutes } from "./animal.routes";
import { userRoutes } from "./user.routes";
import { milkRoutes } from "./milk.routes";

const router = express.Router();

animalRoutes(router);
userRoutes(router);
milkRoutes(router);

router.get("/dashboard", (req, res, next) => {
  return new InitialDashboardController(
    new InitialDashboardUseCase(new AnimalRepository())
  ).handle(req, res, next);
});

export default router
