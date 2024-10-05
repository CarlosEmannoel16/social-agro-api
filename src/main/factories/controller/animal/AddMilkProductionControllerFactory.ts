import { AnimalRepository } from "@/infra/repository/animal/AnimalRepository";
import { MilkProductionRepository } from "@/infra/repository/milkProduction/MilkProductionRepository";
import { AddMilkProductionAnimalController } from "@/presetation/controllers/animal/AddMilkProductionAnimalController";
import { AddMilkProductionUseCase } from "@/usecase/animal/addMilkProduction/AddMilkProductionUseCase";

export const makeAddMilkProductionController = () => {
  const animalRepository = new AnimalRepository();
  const milkProductionRepository = new MilkProductionRepository();
  const addMilkProductionUseCase = new AddMilkProductionUseCase(
    animalRepository,
    milkProductionRepository
  );

  return new AddMilkProductionAnimalController(addMilkProductionUseCase);
};
