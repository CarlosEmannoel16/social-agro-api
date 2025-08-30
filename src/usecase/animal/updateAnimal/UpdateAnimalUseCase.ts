import { AnimalRepository } from "@/infra/repository/AnimalRepository";
import { inputUpdateAnimalDto } from "./DTOs";
import { UpdateAnimalRepositoryDTO } from "@/domain/animal/interfaces/AnimaProtocolRepository";

export class UpdateAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepository) {}
  async execute(data: UpdateAnimalRepositoryDTO) {
    return this.animalRepository.update(data);
  }
}
