import { HistoryWeighRepository } from "@/infra/repository/historyWeigh/HistoryWeighRepository";

export class EditAnimalWeighUseCase {
  constructor(private weighRepository: HistoryWeighRepository) {}

  async execute(animalId: number, data: any): Promise<void> {
    await this.weighRepository.edit(animalId, data);
  }
}
