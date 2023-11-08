import { User } from "../entity/User";
import { CreateUserServiceProtocol } from "../protocols/services/CreateUserServiceProtocol";
import { UserRepositoryInterface } from "../repository/UserRepositoryInterface";

export class CreateUserService implements CreateUserServiceProtocol {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async handle(data: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
