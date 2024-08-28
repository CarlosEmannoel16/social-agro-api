import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { AddNotationAnimalUseCase } from "./AddNotationAnimalUseCase";

describe("Add notation use case unit", () => {
  const makeAnimalRepository = (): AnimalRepositoryInterface => ({
    findWithParams: jest.fn(),
    ...{} as any
  });
  const makeSut = () => {

    const animalRepositorySpy = makeAnimalRepository();
    return new AddNotationAnimalUseCase(animalRepositorySpy);
  };
});
