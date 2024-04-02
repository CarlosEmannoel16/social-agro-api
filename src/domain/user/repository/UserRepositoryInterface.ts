import { User } from "../entity/User";
import { RepositoryInterface } from "../../_shared/repository/RepositoryInsterface";

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  findByEmail(email: string): Promise<User | undefined>;
  find(id: string): Promise<User | undefined>;
  findByName(name: string): Promise<User[] | undefined>;
  addImage(imageUrl: string, userId: string): Promise<void>;
}
