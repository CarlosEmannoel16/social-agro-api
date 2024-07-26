import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { InputAddMilkProductionDTO } from "./AddMilkProductionDTO";
import { MilkRepositoryInterface } from "@/domain/animal/repository/MilkProductionRepository";

export class AddMilkProductionUseCase {
  constructor(
    private readonly animalRepository: AnimalRepositoryInterface,
    private readonly milkProductionRepository: MilkRepositoryInterface
  ) {}

  async handler({
    animalId,
    ownerId,
    dateOfProduction,
    quantityOfMilk,
  }: InputAddMilkProductionDTO) {
    const animal = await this.animalRepository.find(ownerId, animalId);

    if (!animal) throw new Error("Animal não encontrado");

    if (dateOfProduction > new Date())
      throw new Error(
        "Data da produção deve ser igual ou anterior a data atual"
      );

    await this.milkProductionRepository.addDailyMilkProduction({
      dailyMilkProduction: quantityOfMilk,
      date: dateOfProduction,
      idAnimal: animal.id,
      idUser: ownerId,
    });
  }
}
