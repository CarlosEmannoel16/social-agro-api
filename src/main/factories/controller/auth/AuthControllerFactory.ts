import UserRepository from "../../../../infra/user/repository/UserRepository";
import { AuthenticationController } from "../../../../presetation/controllers/authentication/AuthenticationController";
import { AuthUseCase } from "../../../../usecase/auth/auth";

export const makeAuthenticationControllerController = () => {
    const createUserUseCase = new AuthUseCase(new UserRepository());
    return new AuthenticationController(createUserUseCase);
}