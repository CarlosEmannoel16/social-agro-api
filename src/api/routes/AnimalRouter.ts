import express from "express";
import { routeAdapter } from "./@shared/routeAdptar";
import { makeCreateAnimalController } from "../../main/factories/controller/animal/CreateAnimalControllerFactory";
import { makeFindAnimalController } from "../../main/factories/controller/animal/FindAnimalControllerFactory";
import { makeFindAllAnimalController } from "../../main/factories/controller/animal/FindAllAnimalControllerFactory";
import upload from "../../config/upload";

const animalRouter = express.Router();

animalRouter.post("/", upload.array('profiles'), routeAdapter(makeCreateAnimalController()));
animalRouter.put("/:id/add-image", routeAdapter(makeCreateAnimalController()));
animalRouter.get("/:id", routeAdapter(makeFindAnimalController()));
animalRouter.get("/", routeAdapter(makeFindAllAnimalController()));

export { animalRouter };
