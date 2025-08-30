import { HistoryWeightRepository } from "@/infra/repository/historyWeight/HistoryWeightRepository";

export class EditAnimalWeightUseCase {
  constructor(private weighRepository: HistoryWeightRepository) {}

  async execute(animalId: number, data: any): Promise<void> {
    await this.weighRepository.edit(animalId, data);
  }
}
