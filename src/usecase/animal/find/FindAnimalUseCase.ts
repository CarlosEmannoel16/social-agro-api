import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { FindAnimalUseCaseProtocol } from "../../../protocols/usecases/animal/FindAnimalUseCaseProtocol";
import { InputFindAnimalDTO, OutputFindAnimalDTO } from "./FindAnimalDTO";

export class FindAnimalUseCase implements FindAnimalUseCaseProtocol {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

  async execute(input: InputFindAnimalDTO): Promise<OutputFindAnimalDTO> {
    const animalResult = await this.animalRepository.find(input.id);
    if (!animalResult) throw new Error("Animal not found with this id");

    return {
      id: animalResult.id,
      name: animalResult.surname,
      breed: animalResult.breed,
      age: animalResult.getAgeAnimal(),
      type: animalResult.type,
      fatherId: animalResult.fatherId,
      motherId: animalResult.motherId,
    };
  }
}
