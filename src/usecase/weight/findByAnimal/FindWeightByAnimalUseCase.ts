import { HistoryWeightRepository } from "@/infra/repository/HistoryWeightRepository";

export class FindWeightByAnimalUseCase {
  constructor(private weighRepository: HistoryWeightRepository) {}

  async execute(animalId: string): Promise<
    | {
        id: number | undefined;
        animalId: string;
        weight: number;
        date: Date;
      }[]
    | null
  > {
    const result = await this.weighRepository.findByAnimalId(animalId);
    return result.map((hp) => ({
      id: hp.id,
      animalId: hp.animal_id,
      weight: hp.weight,
      date: hp.date,
    }));
  }
}
