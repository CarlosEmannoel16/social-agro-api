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
      milkProduction: animal.getMilkProductions(),
    }));
  }
}

export class FindAllAnimalsUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

  async execute(idUser: string): Promise<OutputFindAllAnimalDTO[]> {
    const animals = await this.animalRepository.findAll(idUser);

    console.log(animals);

    const animalMapper = new AnimalMapper();

    return animalMapper.map(animals || []);
  }
}
