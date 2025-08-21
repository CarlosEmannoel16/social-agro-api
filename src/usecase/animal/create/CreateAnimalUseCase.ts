import { AnimalRepositoryInterface } from "../../../domain/animal/interfaces/AnimaProtocolRepository";
import { UserRepositoryInterface } from "../../../domain/user/interfaces/UserRepositoryInterface";
import { InputCreateAnimalDTO, OutputCreateAnimalDTO } from "./DTOs";

export class CreateAnimalUseCase {
  constructor(
    private readonly animalRepository: AnimalRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface
  ) {}
  async execute(data: InputCreateAnimalDTO): Promise<void> {
    const user = await this.userRepository.find(data.ownerId);
    if (!user) throw new Error("Usuário não encontrado");

    await this.animalRepository.create({
      ...data,
      userId: data.ownerId,
      images: data.images ?? [],
      weightHistory: data.weight
        ? [
            {
              date: new Date(),
              weight: data.weight,
            },
          ]
        : [],
    });
  }
}
