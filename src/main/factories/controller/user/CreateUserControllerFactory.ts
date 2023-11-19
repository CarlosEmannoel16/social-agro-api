import UserRepository from "../../../../infra/user/repository/UserRepository";
import { CreateUserController } from "../../../../presetation/controllers/user/CreateUserController";
import CreateUserUseCase from "../../../../usecase/user/create/CreateUseUseCase";

export const makeCreateUserController = () => {
    const createUserUseCase = new CreateUserUseCase(new UserRepository());
    return new CreateUserController(createUserUseCase);
}