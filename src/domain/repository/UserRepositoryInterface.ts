import { User } from "../entity/User";
import { RepositoryInterface } from "./RepositoryInsterface";

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  findByEmail(email: string): Promise<User | undefined>;
}
