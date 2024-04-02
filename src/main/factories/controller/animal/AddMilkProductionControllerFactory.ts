import { AnimalRepository } from "@/infra/animal/AnimalRepository";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";

export const makeAddMilkProductionController = () => {
  const animalRepository = new AnimalRepository();
  const addMilkProductionUseCase = new AddMilkProductionUseCase(
    animalRepository
  );
};
