import { Animal } from "../../../_@shared/decorators/Test";
import { InputSearchAnimalUseCase, OutputSearchAnimalUseCase } from "../../../usecase/animal/search/SearchAnimalDTO";

export interface SearchAnimalUseCaseProtocol {
    execute(Input: InputSearchAnimalUseCase): Promise<OutputSearchAnimalUseCase[] | []>;
}