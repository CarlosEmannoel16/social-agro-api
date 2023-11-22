import express from "express";
import { routeAdapter } from "./@shared/routeAdptar";
import { makeCreateAnimalController } from "../../main/factories/controller/animal/CreateAnimalControllerFactory";
import { makeFindAnimalController } from "../../main/factories/controller/animal/FindAnimalControllerFactory";
import { makeFindAllAnimalController } from "../../main/factories/controller/animal/FindAllAnimalControllerFactory";

const animalRouter = express.Router();

animalRouter.post("/", routeAdapter(makeCreateAnimalController()));
animalRouter.get("/:id", routeAdapter(makeFindAnimalController()));
animalRouter.get("/", routeAdapter(makeFindAllAnimalController()));

export { animalRouter };
