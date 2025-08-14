import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { InputAddWeightAnimalDTO } from "./DTOs";
import { validationAddWeightUseCase } from "./Validation";

export class AddWeightAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(data: InputAddWeightAnimalDTO) {
    validationAddWeightUseCase.validateInput(data);

    const animal = await this.animalRepository.find({
      animalId: data.idAnimal,
      userId: data.idUser,
    });
    if (!animal) throw new Error("Animal não encontrado");

    await this.animalRepository.addWeight({
      date: new Date(data.date),
      idAnimal: animal.id,
      weight: Number(data.weight),
    });
  }
}
