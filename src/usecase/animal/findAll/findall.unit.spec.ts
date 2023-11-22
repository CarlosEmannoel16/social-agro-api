import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { FindAllAnimalsUseCase } from "./FindAllAnimalsUseCase";

const makeAnimalRepository = (): AnimalRepositoryInterface => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};

describe("Find all Animal Use Case Unit Test", () => {
  test("should return a list of animals", () => {
    const animalRepositoryStub = makeAnimalRepository();
    const sut = new FindAllAnimalsUseCase(animalRepositoryStub);

    animalRepositoryStub.findAll = jest.fn().mockReturnValueOnce(null);

    expect(sut.execute()).resolves.toEqual([]);
  });
});
