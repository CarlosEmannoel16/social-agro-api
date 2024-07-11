import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { InputAddMilkProductionDTO } from "./AddMilkProductionDTO";

export class AddMilkProductionUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

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

      // await this.animalRepository.addDailyMilkProduction({
      //   dailyMilkProduction: quantityOfMilk,
      //   date: dateOfProduction,
      //   idAnimal: animal.id,
      //   idUser: ownerId
      // })
  }
}
