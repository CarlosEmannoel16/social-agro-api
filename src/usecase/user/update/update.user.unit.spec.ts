import { User } from "../../../domain/user/entity/User";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { UpdateUserUseCase } from "./UpdateUseCase";
import { InputUpdateUserDTO } from "./UpdateUserDTO";

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

    return {sut, mockRepository}
}

describe("Update User Unit Use Case", () => {
  it("should update user", () => {
    const input: InputUpdateUserDTO = {
      email: "any_email",
      id: "any_id",
      name: "any_name",
      password: "any_password",
    };
  });
});
