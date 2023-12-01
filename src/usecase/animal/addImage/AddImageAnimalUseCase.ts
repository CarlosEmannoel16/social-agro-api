import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { AddImageAnimalUseCaseProtocol } from "../../../protocols/usecases/animal/AddImageAnimalUseCaseProtocol";
import { InputAddImageAnimalDTO } from "./AddImageAnimalDTO";

export class AddImageAnimalUseCase implements AddImageAnimalUseCaseProtocol {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(data: InputAddImageAnimalDTO): Promise<any> {
    const animal = await this.animalRepository.findAnimalFromUser(
      data.animalId,
      data.ownerId
    );
    if (!animal) throw new Error("Animal not exists");

   await this.animalRepository.addImage(data.animalId, data.imageUrl);
  }
}
