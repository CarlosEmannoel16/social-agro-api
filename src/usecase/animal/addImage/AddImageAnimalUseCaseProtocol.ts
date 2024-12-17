import { InputAddImageAnimalDTO } from "./AddImageAnimalDTO";

export interface AddImageAnimalUseCaseProtocol {
    execute(data: InputAddImageAnimalDTO): Promise<any>;
}