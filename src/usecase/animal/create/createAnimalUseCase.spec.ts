import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { CreateAnimalUseCase } from "./CreateAnimalUseCase";
import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";
import { InputCreateAnimalDTO } from "./CreateUserDTO";

describe("Unit Create Animal Use Case", () => {
  const makeAnimalRepository = (): AnimalRepositoryInterface => {
    return {
      create: jest.fn(),
      addImage: jest.fn(),
      addNote: jest.fn(),
      addWeight: jest.fn(),
      deleteNote: jest.fn(),
      editNote: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
      findWithParams: jest.fn(),
      update: jest.fn(),
    };
  };

  const makeUserRepository = (): UserRepositoryInterface => {
    return {
      addImage: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findByName: jest.fn(),
      update: jest.fn(),
      checkIfExistsByEmail: jest.fn(),
      checkIfExistsByPhone: jest.fn(),
    };
  };

  const makeSut = () => {
    const animalRepositorySpy = makeAnimalRepository();
    const userRepositorySpy = makeUserRepository();
    const sut = new CreateAnimalUseCase(animalRepositorySpy, userRepositorySpy);
    return { sut, animalRepositorySpy, userRepositorySpy };
  };

  it("should return error when user not found", async () => {
    const { sut, userRepositorySpy } = makeSut();
    const data = {} as InputCreateAnimalDTO;

    userRepositorySpy.find = jest.fn().mockResolvedValueOnce(null);

    expect(await sut.execute(data)).rejects.toThrow("Usuário não encontrado");
  });
});
