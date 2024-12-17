import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";

export class InitialDashboardUseCase {
  constructor(animalRepository: AnimalRepositoryInterface) {}
  async execute() {
    return {
        totalAnimals: 2,
    };
  }
}
