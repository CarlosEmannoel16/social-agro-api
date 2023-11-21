import express from "express";
import { routeAdapter } from "./@shared/routeAdptar";
import { makeCreateAnimalController } from "../../main/factories/controller/animal/CreateAnimalControllerFactory";

const animalRouter = express.Router();

animalRouter.post("/", routeAdapter(makeCreateAnimalController()));

export { animalRouter };
