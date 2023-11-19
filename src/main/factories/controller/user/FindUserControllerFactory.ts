import UserRepository from "../../../../infra/user/repository/UserRepository";
import { FindUserController } from "../../../../presetation/controllers/user/FindUserController";
import FindUserUseCase from "../../../../usecase/user/find/FindUserUsecase";

export const makeFindUserController = () => {
  const findUserUseCase = new FindUserUseCase(new UserRepository());
  return new FindUserController(findUserUseCase);
};
