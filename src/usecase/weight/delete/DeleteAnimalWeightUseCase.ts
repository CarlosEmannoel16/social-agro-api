import { HistoryWeightRepository } from "@/infra/repository/historyWeight/HistoryWeightRepository";

export class DeleteAnimalWeightUseCase {
  constructor(private weighRepository: HistoryWeightRepository) {}

  async execute(animalId: number): Promise<void> {
    await this.weighRepository.delete(animalId);
  }
}
