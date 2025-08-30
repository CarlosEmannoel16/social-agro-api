import { HistoryWeighRepository } from "@/infra/repository/historyWeigh/HistoryWeighRepository";

export class FindWeighByIdUseCase {
  constructor(private historyWeighRepository: HistoryWeighRepository) {}

  async execute(id: number): Promise<any | null> {
    return this.historyWeighRepository.findById(id);
  }
}
