import { User } from "../../../domain/user/entity/User";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import CreateUserUseCase from "./CreateUseUseCase";
import { InputCreateUserDTO } from "./CreateUserDTO";

const makeSut = () => {
  const makeUserRepository = (): UserRepositoryInterface => ({
    create: jest.fn(),
    findByEmail: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    addImage: jest.fn(),
    findByName: jest.fn(),
  });
  const userRepository = makeUserRepository();

  const sut = new CreateUserUseCase(userRepository);

  return { sut, userRepository };
};

describe("Test Create User Use Case Unit", () => {
  it("should return correct data ", async () => {
    const { sut, userRepository } = makeSut();

    userRepository.findByEmail = jest.fn().mockResolvedValueOnce(undefined);

    const userInstance = new User(
      "any_id",
      "any_name",
      "any_email",
      "any_password",
      new Date(),
      new Date(),
      new Date()
    );
    userRepository.create = jest.fn().mockResolvedValueOnce(userInstance);

    const input: InputCreateUserDTO = {
      name: "any_name",
      email: "any_email",
      password: "any_password",
      passwordConfirmation: "any_password",
      imageUrl: "any_image_url",
    };

    const output = await sut.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: "any_name",
      email: "any_email",
    });
  });
});
