import { HistoryWeightRepository } from "@/infra/repository/HistoryWeightRepository";

export class DeleteAnimalWeightUseCase {
  constructor(private weighRepository: HistoryWeightRepository) {}

  async execute(id: number): Promise<void> {
    await this.weighRepository.delete(id);
  }
}
