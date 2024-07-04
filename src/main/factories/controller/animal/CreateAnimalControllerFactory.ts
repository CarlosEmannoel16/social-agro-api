import { AnimalRepository } from "../../../../infra/repository/animal/AnimalRepository";
import UserRepository from "../../../../infra/user/repository/UserRepository";
import { CreateAnimalController } from "../../../../presetation/controllers/animal/CreateAnimalController";
import { CreateAnimalUseCase } from "../../../../usecase/animal/create/CreateAnimalUseCase";

export const makeCreateAnimalController = () => {
  const animalRepository = new AnimalRepository();
  const userRepository = new UserRepository();
  const createAnimalUseCase = new CreateAnimalUseCase(
    animalRepository,
    userRepository
  );
  const createAnimalController = new CreateAnimalController(
    createAnimalUseCase
  );
  return createAnimalController;
};
