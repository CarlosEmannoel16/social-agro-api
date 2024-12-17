import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { InputAddImageAnimalDTO } from "./DTOs";

export class AddImageAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(data: InputAddImageAnimalDTO): Promise<any> {
    const animal = await this.animalRepository.findWithParams(
      {
        surname: data.animalId,
      },
      data.ownerId
    );
    if (!animal) throw new Error("Animal not exists");

    await this.animalRepository.addImage(
      data.animalId,
      data.imageUrl,
      data.ownerId
    );
  }
}
