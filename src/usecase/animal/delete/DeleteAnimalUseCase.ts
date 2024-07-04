import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";

export class DeleteAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async handle({ animalId }) {
    const animal = await this.animalRepository.find(ownerId, animalId);

    if (!animal) throw new Error("Animal não encontrado");

    if (animal.IdMother || animal.idFather) {
      throw new Error(
        "Animal não pode ser deletado pois possui pais associados"
      );
    }
  }
}
