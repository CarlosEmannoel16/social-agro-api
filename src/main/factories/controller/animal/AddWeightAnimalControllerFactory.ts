import { AnimalRepository } from "../../../../infra/animal/AnimalRepository";
import { AddWeightAnimalController } from "../../../../presetation/controllers/animal/AddWeightAnimalController";
import { AddWeightAnimalUseCase } from "../../../../usecase/animal/addWeight/AddWeigthUseCase";

export const makeAddWeightAnimalController = () => {
  const animalRepository = new AnimalRepository();
  const addWeightAnimalUseCase = new AddWeightAnimalUseCase(animalRepository);
  return new AddWeightAnimalController(addWeightAnimalUseCase);
};
