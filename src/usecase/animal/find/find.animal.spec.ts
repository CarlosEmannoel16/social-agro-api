import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { FindAnimalUseCase } from "./FindAnimalUseCase";

const makeAnimalRepository = (): AnimalRepositoryInterface => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};
describe("Find Animal Use Case Unit Test", () => {
  test("Should return error if animal not found", () => {
    const animalRepositoryStub = makeAnimalRepository();
    const sut = new FindAnimalUseCase(animalRepositoryStub);

    animalRepositoryStub.find = jest.fn().mockReturnValueOnce(null);

    expect(sut.execute({ id: "1" })).rejects.toThrow(
      "Animal not found with this id"
    );
  });
});
