import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { InputAddMilkProductionDTO } from "./DTOs";
import { MilkRepositoryInterface } from "@/domain/animal/repository/MilkProductionRepository";
import { ValidationError } from "@/_shared/errors/Errors";
import { AddMilkProductionUseCaseValidation } from "./Validation";

export class AddMilkProductionUseCase extends AddMilkProductionUseCaseValidation {
  constructor(
    private readonly animalRepository: AnimalRepositoryInterface,
    private readonly milkProductionRepository: MilkRepositoryInterface
  ) {
    super();
  }

  async handler(data: InputAddMilkProductionDTO) {
    this.validate(data);
    if (data.dateOfProduction > new Date())
      throw new ValidationError(
        "Data da produção deve ser igual ou anterior a data atual"
      );

    const animal = await this.animalRepository.find({
      animalId: data.animalId,
      userId: data.userId,
    });

    console.log(animal);

    if (!animal) throw new Error("Animal não encontrado");

    await this.milkProductionRepository.addDailyMilkProduction({
      dailyMilkProduction: data.quantityOfMilk,
      date: data.dateOfProduction,
      idAnimal: animal.id,
      idUser: data.userId,
    });
  }
}
