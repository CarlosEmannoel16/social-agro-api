import { OutputFindAllAnimalDTO } from "../../../usecase/animal/findAll/FindAllAnimalsDTO";

export interface FindAllAnimalsUseCaseProtocol {
  execute(idUser: string): Promise<OutputFindAllAnimalDTO[]>;
}
