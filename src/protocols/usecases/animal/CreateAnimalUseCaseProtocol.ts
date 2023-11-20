import {
  InputCreateAnimalDTO,
  OutputCreateAnimalDTO,
} from "../../../usecase/animal/create/CreateUserDTO";

export interface CreateAnimalUseCaseProtocol {
  execute(data: InputCreateAnimalDTO): Promise<OutputCreateAnimalDTO>;
}
