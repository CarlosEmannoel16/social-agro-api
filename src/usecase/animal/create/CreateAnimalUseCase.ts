import { AnimalFactory } from "../../../domain/animal/factory/AnimalFactory";
import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { CreateAnimalUseCaseProtocol } from "../../../protocols/usecases/animal/CreateAnimalUseCaseProtocol";
import { InputCreateAnimalDTO, OutputCreateAnimalDTO } from "./CreateAnimalDTO";

export class CreateAnimalUseCase implements CreateAnimalUseCaseProtocol {
  constructor(
    private readonly animalRepository: AnimalRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface
  ) {}
  async execute(data: InputCreateAnimalDTO): Promise<OutputCreateAnimalDTO> {
    const user = await this.userRepository.find(data.ownerId);
    if (!user) throw new Error("Usuário não encontrado");

    const animal = AnimalFactory.createNewAnimal({
      dateOfBirth: new Date(data.dateOfBirth),
      type: data.type,
      surname: data.surname,
      breed: data.breed,
      images: data.images,
      ownerId: data.ownerId,
    });

    const result = await this.animalRepository.create(animal);

    if (!result) throw new Error("Erro ao criar animal");
    return {
      id: result.id,
      surname: result.surname,
      images: result.image,
    };
  }
}
