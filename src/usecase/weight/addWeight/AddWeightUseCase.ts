import { HistoryWeightRepository } from "@/infra/repository/historyWeight/HistoryWeightRepository";
import { InputAddWeigh } from "./Dto";

export class AddWeightAnimalUseCase {
  constructor(private historyWeighRepository: HistoryWeightRepository) {}

  async execute(data: InputAddWeigh): Promise<void> {
    await this.historyWeighRepository.create(data);
  }
}
