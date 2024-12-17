import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import {
  InputSearchAnimalUseCase,
  OutputSearchAnimalUseCase,
} from "./SearchAnimalDTO";
import { SearchAnimalUseCaseProtocol } from "./SearchAnimelUseCaseProtocol";

export class SearchAnimalUseCase implements SearchAnimalUseCaseProtocol {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(
    params: InputSearchAnimalUseCase
  ): Promise<OutputSearchAnimalUseCase[] | []> {
    const data = await this.animalRepository.findWithParams(
      {
        surname: params.params,
      },
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
      updatedAt: animal.updatedAt,
    }));
  }
}
