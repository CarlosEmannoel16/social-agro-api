import { AnimalDTO } from "@/domain/animal/types/AnimalDTO";
import { AnimalRepositoryInterface } from "../../../domain/animal/interfaces/AnimaProtocolRepository";
import { InputFindAnimalDTO } from "./DTOs";

export class FindAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

  async execute(input: InputFindAnimalDTO): Promise<AnimalDTO> {
    const animalResult = await this.animalRepository.findByID(
      input.id,
      input.userId
    );
    if (!animalResult) throw new Error("Animal not found with this id");

    return animalResult.formatToReturn()
  }
}
