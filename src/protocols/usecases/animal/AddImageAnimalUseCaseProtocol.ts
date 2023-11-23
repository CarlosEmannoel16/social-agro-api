import { InputAddImageAnimalDTO } from "../../../usecase/animal/addImage/AddImageAnimalDTO";

export interface AddImageAnimalUseCaseProtocol {
    execute(data: InputAddImageAnimalDTO): Promise<any>;
}