import UserRepository from "../../../../infra/user/repository/UserRepository"
import CreateUserUseCase from "../../../../usecase/user/create/CreateUseUseCase"

export const makeCreateUserUseCase = () => {
    return new CreateUserUseCase(new UserRepository())
}