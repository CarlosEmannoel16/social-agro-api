import { Animal } from "../../../domain/animal/entity/Animal";
import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { MapperProtocol } from "../../_shared/MapperProtocol";
import { OutputFindAllAnimalDTO } from "./DTOs";

class AnimalMapper implements MapperProtocol<Animal, OutputFindAllAnimalDTO> {
  map(data: Animal[]): OutputFindAllAnimalDTO[] {
    return data.map((animal) => ({
      age: animal.getAgeAnimal(),
      breed: animal.breed,
      createdAt: animal.createdAt,
      id: animal.id,
      image: animal.image,
      name: animal.surname,
      ownerId: animal.ownerId,
      updatedAt: animal.updatedAt,
      weightHistory: animal.getWeight(),
      lasProductionDate: animal.lastProductionDate,
      milkProduction: animal.getMilkProductions(),
      images: animal.image,
      gender: animal.gender,
      fastId: animal.fastId
    }));
  }
}

export class FindAllAnimalsUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

  async execute(idUser: string): Promise<OutputFindAllAnimalDTO[]> {
    const animals = await this.animalRepository.findAll(idUser);

    const animalMapper = new AnimalMapper();

    const result = animalMapper.map(animals || []);
    return result;
  }
}
