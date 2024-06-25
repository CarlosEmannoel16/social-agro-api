import { AnimalRepository } from "../../../../infra/repository/animal/AnimalRepository";
import { FindAllAnimalsController } from "../../../../presetation/controllers/animal/FindAllAnimalsController";
import { FindAllAnimalsUseCase } from "../../../../usecase/animal/findAll/FindAllAnimalsUseCase";

export const makeFindAllAnimalController = () => {
  const findAllAnimalUseCase = new FindAllAnimalsUseCase(
    new AnimalRepository()
  );
  const findAllAnimalsCOntroller = new FindAllAnimalsController(
    findAllAnimalUseCase
  );
  return findAllAnimalsCOntroller;
};
