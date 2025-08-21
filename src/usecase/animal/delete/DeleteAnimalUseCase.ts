import { AnimalRepositoryInterface } from "@/domain/animal/interfaces/AnimaProtocolRepository";
import { InputDeleteAnimalUseCaseProtocol } from "./DTOs";

export class DeleteAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async handle(data: InputDeleteAnimalUseCaseProtocol) {
    const animal = await this.animalRepository.find({
      animalId: data.id,
      userId: data.userId,
    });

    if (!animal) throw new Error("Animal não encontrado");
    await this.animalRepository.delete(data.id)
  }
}
