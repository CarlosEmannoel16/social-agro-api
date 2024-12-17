import {
  InputCreateAnimalDTO,
  OutputCreateAnimalDTO,
} from "../../../usecase/animal/create/CreateAnimalDTO";

export interface CreateAnimalUseCaseProtocol {
  execute(data: InputCreateAnimalDTO): Promise<OutputCreateAnimalDTO>;
}
