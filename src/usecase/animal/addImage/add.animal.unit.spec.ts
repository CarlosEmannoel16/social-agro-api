import { AnimalRepositoryInterface } from "../../../domain/animal/repository/AnimaProtocolRepository";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { AddImageAnimalUseCase } from "./AddImageAnimalUseCase";

const makeAnimalRepository = (): AnimalRepositoryInterface => ({
  addImage: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  addNote: jest.fn(),
  addWeight: jest.fn(),
  deleteNote: jest.fn(),
  editNote: jest.fn(),
  findWithParams: jest.fn(),
  createSon: jest.fn(),
  findByIds: jest.fn(),
});

const makeUserRepository = (): UserRepositoryInterface => ({
  create: jest.fn(),
  findByEmail: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  addImage: jest.fn(),
  findByName: jest.fn(),
  checkIfExistsByEmail: jest.fn(),
  checkIfExistsByPhone: jest.fn(),
});

describe("Test Unit Add Image Animal Use Case ", () => {
  it("Should throw new error if animal not exists", () => {
    const animalRepositoryMock = makeAnimalRepository();
    const sut = new AddImageAnimalUseCase(animalRepositoryMock);

    animalRepositoryMock.find = jest.fn().mockResolvedValueOnce(undefined);

    expect(
      sut.execute({ animalId: "1", imageUrl: "image", ownerId: "2" })
    ).rejects.toThrow("Animal not exists");
  });
});
