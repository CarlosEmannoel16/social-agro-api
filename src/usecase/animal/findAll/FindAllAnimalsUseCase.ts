import { AnimalRepositoryInterface } from "../../../domain/animal/interfaces/AnimaProtocolRepository";
import { OutputFindAllAnimalDTO } from "./DTOs";

export class FindAllAnimalsUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

  async execute(idUser: string): Promise<OutputFindAllAnimalDTO[]> {
    const animals = await this.animalRepository.findAll(idUser);

    const result = animals.map((animal) => ({
      age: animal.ageAnimal,
      breed: animal.breed,
      createdAt: animal.dateOfCreation,
      id: animal.id,
      name: animal.name,
      ownerId: animal.ownerId,
      updatedAt: animal.dateOfUpdate,
      weightHistory: animal.weightFormatted,
      lasProductionDate: animal.lastProductionDate,
      milkProduction: animal.milkProductionsFormatted,
      images: animal.images ?? [],
      gender: animal.gender,
      fastId: animal.fastId,
    }));
    return result;
  }
}
