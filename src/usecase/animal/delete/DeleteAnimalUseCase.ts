import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";

export class DeleteAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async handle({ animalId, ownerId }) {
    const animal = await this.animalRepository.find(ownerId, animalId);

    if (!animal) throw new Error("Animal não encontrado");

    if (animal.ownerId !== ownerId)
      throw new Error("Animal não pertence ao usuário");

    if (animal.IdMother || animal.idFather) {
      throw new Error("Animal não pode ser deletado pois possui pais associados");
    }

    
  }
}
