import UserRepository from "@/infra/repository/user/repository/UserRepository";
import { AnimalRepository } from "../../../../infra/repository/animal/AnimalRepository";
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
