import { HistoryWeightRepository } from '@/infra/repository/HistoryWeightRepository';

interface EditAnimalWeightData {
  date: Date;
  weight: number;
}
export class EditAnimalWeightUseCase {
  constructor(private weighRepository: HistoryWeightRepository) {}

  async execute(animalId: number, data: EditAnimalWeightData): Promise<void> {
    await this.weighRepository.edit(animalId, data);
  }
}
