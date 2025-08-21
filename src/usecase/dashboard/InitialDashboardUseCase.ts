import { AnimalRepositoryInterface } from "@/domain/animal/interfaces/AnimaProtocolRepository";

export class InitialDashboardUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(userId: string) {
    const [
      initialData,
      lastSevenDays,
      milkProductionRanking,
      milkProductionRankingByBreed,
    ] = await Promise.all([
      this.animalRepository.getInitialDashboardValues(userId),
      this.animalRepository.getLastWeekMilkProductionByDay(userId),
      this.animalRepository.getMilkProductionRanking(userId),
      this.animalRepository.getMilkProductionRankingByBreed(userId),
    ]);


    return {
      lastSevenDays,
      initialData,
      milkProductionRanking,
      milkProductionRankingByBreed,
    };
  }
}
