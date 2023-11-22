import { Animal } from "../../../domain/animal/entity/Animal";
import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { FindAllAnimalsUseCaseProtocol } from "../../../protocols/usecases/animal/FindAllAnimalsUseCaseProtocol";
import { MapperProtocol } from "../../@shared/MapperProtocol";
import { OutputFindAllAnimalDTO } from "./FindAllAnimalsDTO";

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
    }));
  }
}

export class FindAllAnimalsUseCase implements FindAllAnimalsUseCaseProtocol {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

  async execute(): Promise<OutputFindAllAnimalDTO[]> {
    const animals = await this.animalRepository.findAll();

    const animalMapper = new AnimalMapper();

    return animalMapper.map(animals || []);
  }
}
