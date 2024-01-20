import { Animal } from "../../../_@shared/decorators/Test";
import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { SearchAnimalUseCaseProtocol } from "../../../protocols/usecases/animal/SearchAnimelUseCaseProtocol";
import {
  InputSearchAnimalUseCase,
  OutputSearchAnimalUseCase,
} from "./SearchAnimalDTO";

export class SearchAnimalUseCase implements SearchAnimalUseCaseProtocol {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(
    params: InputSearchAnimalUseCase
  ): Promise<OutputSearchAnimalUseCase[] | []> {
    const data = await this.animalRepository.findWithParams(
      params.params,
      params.idUser
    );
    if (!data?.length) return [];
    return data.map((animal) => ({
      id: animal.id,
      age: animal.getAgeAnimal(),
      breed: animal.breed,
      createdAt: animal.createdAt,
      image: animal.image,
      name: animal.surname,
      ownerId: animal.ownerId,
      updatedAt: animal.updatedAt,
    }));
  }
}
