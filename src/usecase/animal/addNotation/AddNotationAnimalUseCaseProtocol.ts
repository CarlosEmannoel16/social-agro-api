import { InputAddNotationAnimalDTO } from "@/usecase/animal/addNotation/AddNotationAnimalDTO";

export interface AddNotationAnimalUseCaseProtocol {
    execute(data: InputAddNotationAnimalDTO): Promise<any>;
}