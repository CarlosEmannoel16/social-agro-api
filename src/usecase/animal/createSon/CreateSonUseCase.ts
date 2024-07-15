import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import {
  CreateSonUseCaseInterface,
  InputCreateSonDTO,
  OutputCreateSonDTO,
} from "./CreateSonUseCaseInterface";
import { AnimalFactory } from "@/domain/animal/factory/AnimalFactory";
import { TypeAnimal } from "@/domain/animal/entity/Animal";
import { weightAnimal } from "@/domain/animal/entity/WeightAnimal";

export class CreateSonUseCase implements CreateSonUseCaseInterface {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(data: InputCreateSonDTO): Promise<OutputCreateSonDTO> {
    let father;
    if (data.fatherId)
      father = await this.animalRepository.find(data.fatherId, data.userId);

    if (data.fatherId && !father) {
      throw new Error("Father not found");
    }

    const mother = await this.animalRepository.find(data.motherId, data.userId);

    if (!mother) {
      throw new Error("Mother not found");
    }

    const son = AnimalFactory.createNewAnimal({
      dateOfBirth: data.dateOfBirth,
      motherId: mother.id,
      type: TypeAnimal.COW,
      images: data.images,
      surname: data.surname,
      weightHistory: [new weightAnimal(data.weight, new Date())],
    });

    await this.animalRepository.create(son);

    return {};
  }
}
