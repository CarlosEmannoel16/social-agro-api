import {
  InputFindAnimalDTO,
  OutputFindAnimalDTO,
} from "../../../usecase/animal/find/FindAnimalDTO";

export interface FindAnimalUseCaseProtocol {
  execute(input: InputFindAnimalDTO): Promise<OutputFindAnimalDTO>;
}
