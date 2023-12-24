import { AnimalRepository } from "../../../../infra/animal/AnimalRepository";
import { ControllerProtocol } from "../../../../presetation/controllers/@shared/ControllerProtocol";
import { SearchAnimalController } from "../../../../presetation/controllers/animal/SearchAnimalController";
import { SearchAnimalUseCase } from "../../../../usecase/animal/search/SearchAnimalUseCase";

export const makeSearchAnimalController = (): ControllerProtocol => {
    const searchAnimalUseCase = new SearchAnimalUseCase(new AnimalRepository());
    return new SearchAnimalController(searchAnimalUseCase);
}