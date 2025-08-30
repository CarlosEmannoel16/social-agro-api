import { HistoryWeighRepository } from "@/infra/repository/historyWeigh/HistoryWeighRepository";

export class DeleteAnimalWeighUseCase {
  constructor(private weighRepository: HistoryWeighRepository) {}

  async execute(animalId: number): Promise<void> {
    await this.weighRepository.delete(animalId);
  }
}
