import { HistoryWeighRepository } from "@/infra/repository/historyWeigh/HistoryWeighRepository";
import { InputAddWeigh } from "./Dto";

export class AddWeighAnimalUseCase {
  constructor(private historyWeighRepository: HistoryWeighRepository) {}

  async execute(data: InputAddWeigh): Promise<void> {
    await this.historyWeighRepository.create(data);
  }
}
