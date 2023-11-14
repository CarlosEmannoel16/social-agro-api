import { User } from "../../../domain/user/entity/User";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { UpdateUserUseCase } from "./UpdateUseCase";
import { InputUpdateUserDTO, OutputUpdateUserDTO } from "./UpdateUserDTO";

const user = new User(
  "any_id",
  "any_name",
  "any_email",
  "any_password",
  new Date(),
  new Date()
);

const makeMockRepository = (): UserRepositoryInterface => ({
  create: jest.fn(),
  findByEmail: jest.fn(),
  find: jest.fn().mockResolvedValueOnce(user),
  findAll: jest.fn(),
  update: jest.fn(),
});

const makeSut = () => {
  const mockRepository = makeMockRepository();

  const sut = new UpdateUserUseCase(mockRepository);

  return { sut, mockRepository };
};

describe("Update User Unit Use Case", () => {
  const { mockRepository, sut } = makeSut();
  it("should update user", async () => {
    const input: InputUpdateUserDTO = {
      id: "any_id",
      email: "any_email",
      name: "any_name_updated",
      password: "any_password",
    };

    mockRepository.find = jest.fn().mockResolvedValueOnce(user);

    const result = await sut.execute(input)
     expect(result).toEqual({
       email: "any_email",
       id: expect.any(String),
       name: "any_name_updated",
     });
  });
});
