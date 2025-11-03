import { HistoryWeightRepository } from '@/infra/repository/HistoryWeightRepository';

interface EditAnimalWeightData {
  date: Date;
  weight: number;
}
export class EditAnimalWeightUseCase {
  constructor(private weighRepository: HistoryWeightRepository) {}

  async execute(weightId: number, data: EditAnimalWeightData): Promise<void> {
    await this.weighRepository.edit(weightId, data);
  }
}
