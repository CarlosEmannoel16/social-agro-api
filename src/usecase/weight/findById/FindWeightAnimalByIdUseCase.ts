import { HistoryWeightRepository } from '@/infra/repository/HistoryWeightRepository';

type FindWeightByIdResponse = {
  id: number | undefined;
  animal_id: string;
  weight: number;
  date: Date;
  created_at: Date | undefined;
  updated_at: Date | undefined;
} | null;

export class FindWeightByIdUseCase {
  constructor(private historyWeighRepository: HistoryWeightRepository) {}

  async execute(id: number): Promise<FindWeightByIdResponse> {
    return this.historyWeighRepository.findById(id);
  }
}
