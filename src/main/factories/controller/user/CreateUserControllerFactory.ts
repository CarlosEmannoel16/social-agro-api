import { CreateUserController } from "../../../../presetation/controllers/user/CreateUserController";
import { makeCreateUserUseCase } from "../../usecase/user/CreateUserUseCaseFactory";

export const makeCreateUserController = () => {
    return new CreateUserController(makeCreateUserUseCase());
}