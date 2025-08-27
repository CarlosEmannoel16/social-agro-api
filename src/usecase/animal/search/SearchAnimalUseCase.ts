import { AnimalDTO } from "@/domain/animal/types/AnimalDTO";
import { AnimalRepositoryInterface } from "../../../domain/animal/interfaces/AnimaProtocolRepository";
import { InputSearchAnimalUseCase } from "./DTOs";

export class SearchAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(params: InputSearchAnimalUseCase): Promise<AnimalDTO[] | []> {
    const data = await this.animalRepository.findWithParams(
      {
        surname: params.params,
        fastId: params.params,
      },
      params.idUser
    );
    if (!data?.length) return [];
    return data.map((animal) => animal.formatToReturn());
  }
}
