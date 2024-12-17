import { OutputFindAllAnimalDTO } from "./FindAllAnimalsDTO";

export interface FindAllAnimalsUseCaseProtocol {
  execute(idUser: string): Promise<OutputFindAllAnimalDTO[]>;
}
