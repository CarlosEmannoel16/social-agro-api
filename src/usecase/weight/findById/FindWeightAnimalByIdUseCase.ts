import { HistoryWeightRepository } from "@/infra/repository/HistoryWeightRepository";

export class FindWeightByIdUseCase {
  constructor(private historyWeighRepository: HistoryWeightRepository) {}

  async execute(id: number): Promise<any | null> {
    return this.historyWeighRepository.findById(id);
  }
}
