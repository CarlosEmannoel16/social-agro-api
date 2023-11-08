import { User } from "../../entity/User";

export interface CreateUserServiceProtocol {
  handle(data: User): Promise<User>;
}
