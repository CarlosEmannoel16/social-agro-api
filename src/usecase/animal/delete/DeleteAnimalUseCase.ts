import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { InputDeleteAnimalUseCaseProtocol } from "./DeleteAnimalDTO";

export class DeleteAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async handle(data: InputDeleteAnimalUseCaseProtocol) {
    const animal = await this.animalRepository.find({
      animalId: data.id,
      userId: data.userId,
    });

    if (!animal) throw new Error("Animal não encontrado");
  }
}
