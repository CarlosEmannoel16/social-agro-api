import { AnimalRepository } from "../../../../infra/repository/animal/AnimalRepository";
import { FindAnimalController } from "../../../../presetation/controllers/animal/FindAnimalController";
import { FindAnimalUseCase } from "../../../../usecase/animal/find/FindAnimalUseCase";

export const makeFindAnimalController = () => {
  const animalRepository = new AnimalRepository();
  const findAnimalUseCase = new FindAnimalUseCase(animalRepository);
  const findAnimalController = new FindAnimalController(findAnimalUseCase);
  return findAnimalController;
};
