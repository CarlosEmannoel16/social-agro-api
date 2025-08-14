import { AnimalRepository } from "@/infra/repository/animal/AnimalRepository";
import { inputUpdateAnimalDto } from "./DTOs";
import { UpdateAnimalRepositoryDTO } from "@/domain/animal/repository/AnimaProtocolRepository";

export class UpdateAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepository) {}
  async execute(data: UpdateAnimalRepositoryDTO) {
    return this.animalRepository.update(data);
  }
}
