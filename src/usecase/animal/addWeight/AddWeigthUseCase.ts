import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { InputAddWeightAnimalDTO } from "./AddWeightDTO";

export class AddWeightAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(data: InputAddWeightAnimalDTO) {
    if (!data.idAnimal || !data.idUser || !data.weight || !data.date)
      throw new Error("Dados inválidos");
    const animal = await this.animalRepository.find(data.idUser, data.idAnimal);
    if (!animal) throw new Error("Animal não encontrado");
  

    await this.animalRepository.addWeight(
      {
        date: new Date(data.date),
        idAnimal: data.idAnimal,
        weight: Number(data.weight),
      }
    );
  }
}
