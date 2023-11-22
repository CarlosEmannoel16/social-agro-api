import { OutputFindAllAnimalDTO } from "../../../usecase/animal/findAll/FindAllAnimalsDTO";

export interface FindAllAnimalsUseCaseProtocol {
  execute(): Promise<OutputFindAllAnimalDTO[]>;
}
