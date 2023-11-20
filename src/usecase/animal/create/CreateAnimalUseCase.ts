import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { CreateAnimalUseCaseProtocol } from "../../../protocols/usecases/animal/CreateAnimalUseCaseProtocol";
import { InputCreateAnimalDTO, OutputCreateAnimalDTO } from "./CreateUserDTO";

export class CreateAnimalUseCase implements CreateAnimalUseCaseProtocol {
    constructor(private readonly animalRepository: AnimalRepositoryInterface) {}
  async execute(data: InputCreateAnimalDTO): Promise<OutputCreateAnimalDTO> {
    throw new Error("Method not implemented.");
  }
}
