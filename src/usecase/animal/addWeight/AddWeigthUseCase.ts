import { Logger } from "@/infra/shared/logger/Logger";
import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { InputAddWeightAnimalDTO } from "./AddWeightDTO";
import { validationAddWeightUseCase } from "./Validation";

export class AddWeightAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(data: InputAddWeightAnimalDTO) {
    validationAddWeightUseCase.validateInput(data);

    console.log(data);

    const animal = await this.animalRepository.find({
      animalId: data.idAnimal,
      userId: data.idUser,
    });
    if (!animal) throw new Error("Animal não encontrado");

    console.log(animal);

    await this.animalRepository.addWeight({
      date: new Date(data.date),
      idAnimal: animal.id,
      weight: Number(data.weight),
    });
  }
}
