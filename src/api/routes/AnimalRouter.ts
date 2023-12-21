import express from "express";
import { routeAdapter } from "./@shared/routeAdptar";
import { makeCreateAnimalController } from "../../main/factories/controller/animal/CreateAnimalControllerFactory";
import { makeFindAnimalController } from "../../main/factories/controller/animal/FindAnimalControllerFactory";
import { makeFindAllAnimalController } from "../../main/factories/controller/animal/FindAllAnimalControllerFactory";
import upload from "../../config/upload";

const animalRouter = express.Router();

animalRouter.post("/", upload.single('file'), routeAdapter(makeCreateAnimalController()));
animalRouter.get("/all/:idUser", routeAdapter(makeFindAllAnimalController()));
animalRouter.put("/:id/add-image", routeAdapter(makeCreateAnimalController()));
animalRouter.get("/:id", routeAdapter(makeFindAnimalController()));
animalRouter.patch("/add-weight", routeAdapter(makeCreateAnimalController()));

export { animalRouter };
