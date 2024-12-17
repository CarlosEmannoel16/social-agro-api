import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { InputFindAnimalDTO, OutputFindAnimalDTO } from "./DTOs";

export class FindAnimalUseCase  {
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
