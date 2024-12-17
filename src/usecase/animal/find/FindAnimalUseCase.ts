import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { InputFindAnimalDTO, OutputFindAnimalDTO } from "./FindAnimalDTO";
import { FindAnimalUseCaseProtocol } from "./FindAnimalUseCaseProtocol";

export class FindAnimalUseCase implements FindAnimalUseCaseProtocol {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

  async execute(input: InputFindAnimalDTO): Promise<OutputFindAnimalDTO> {
    const animalResult = await this.animalRepository.find({
      animalId: input.id,
      userId: input.userId,
    });
    if (!animalResult) throw new Error("Animal not found with this id");

    return {
      id: animalResult.id,
      name: animalResult.surname,
      breed: animalResult.breed,
      age: animalResult.getAgeAnimal(),
      type: animalResult.gender,
      fatherId: animalResult.fatherId,
      motherId: animalResult.motherId,
    };
  }
}
