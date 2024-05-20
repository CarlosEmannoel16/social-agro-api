import { User } from "../../../domain/user/entity/User";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { InputFindUserDTO, OutputFindUserDTO } from "./FindUseDTO";
import FindUserUseCase from "./FindUserUsecase";

const MockRepository = (): UserRepositoryInterface => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    addImage: jest.fn(),
    findByName: jest.fn(),
  };
};
describe("Find Customer Unit Tests", () => {
  it("should find a user", async () => {
    const userRepository = MockRepository();
    const user = new User(
      "1234",
      "emannoel",
      "emanoel@email.com",
      "2345",
      new Date(),
      new Date()
    );

    jest.spyOn(userRepository, "find").mockResolvedValueOnce(user);

    const usecase = new FindUserUseCase(userRepository);

    const input: InputFindUserDTO = { id: user.id };
    const output: OutputFindUserDTO = {
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      name: user.name,
      updatedAt: user.updatedAt,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });

  it("should throw an error if user not found", async () => {
    const userRepository = MockRepository();
    userRepository.find = jest.fn().mockImplementation(() => {
      throw new Error("User not found");
    });
    const usecase = new FindUserUseCase(userRepository);
    const input: InputFindUserDTO = { id: "123" };

    expect(usecase.execute(input)).rejects.toThrowError("User not found");
  });
});
