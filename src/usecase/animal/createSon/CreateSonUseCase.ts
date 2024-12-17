import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import {
  
  InputCreateSonDTO,
  OutputCreateSonDTO,
} from "./DTOs";
import { AnimalFactory } from "@/domain/animal/factory/AnimalFactory";
import { weightAnimal } from "@/domain/animal/valueObjects/WeightAnimal";
import { GenderAnimal } from "@/infra/ORM/AnimalEntity";

export class CreateSonUseCase  {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(data: InputCreateSonDTO): Promise<OutputCreateSonDTO> {
    let father;
    if (data.fatherId)
      father = await this.animalRepository.find({
        animalId: data.fatherId,
        userId: data.userId,
      });

    if (data.fatherId && !father) {
      throw new Error("Father not found");
    }

    const mother = await this.animalRepository.find({
      animalId: data.motherId,
      userId: data.userId
    });

    if (!mother) {
      throw new Error("Mother not found");
    }

    const son = AnimalFactory.createNewAnimal({
      dateOfBirth: data.dateOfBirth,
      motherId: mother.id,
      gender: GenderAnimal.COW,
      images: data.images,
      surname: data.surname,
      weightHistory: [new weightAnimal(data.weight, new Date())],
    });

    await this.animalRepository.create(son);

    return {};
  }
}
