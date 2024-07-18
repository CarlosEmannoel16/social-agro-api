import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { CreateAnimalUseCase } from "./CreateAnimalUseCase";
import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";
import { InputCreateAnimalDTO } from "./CreateAnimalDTO";
import { TypeAnimal } from "@/domain/animal/entity/Animal";

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
      createSon: jest.fn(),
      findByIds: jest.fn(),
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
    const data = {
      ownerId: "1",
    } as InputCreateAnimalDTO;

    userRepositorySpy.find = jest.fn().mockResolvedValueOnce(null);

    expect(sut.execute(data)).rejects.toThrow("Usuário não encontrado");
  });

  it("should return error when animal not created", async () => {
    const { sut, animalRepositorySpy, userRepositorySpy } = makeSut();
    const data = {
      ownerId: "1",
      dateOfBirth: new Date(),
      type: TypeAnimal.COW,
      surname: "Rex",
      breed: "Nelore",
      images: [],
      fatherId: "1",
      motherId: "2",
      weight: 10,
    } as InputCreateAnimalDTO;

    userRepositorySpy.find = jest.fn().mockResolvedValueOnce({});
    animalRepositorySpy.create = jest.fn().mockResolvedValueOnce(null);

    expect(await sut.execute(data)).rejects.toThrow("Erro ao criar animal");
  });
});
