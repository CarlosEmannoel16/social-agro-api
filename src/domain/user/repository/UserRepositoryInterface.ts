import { User } from "../entity/User";
import { RepositoryInterface } from "../../_shared/repository/RepositoryInsterface";

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | undefined>;
  find(id: string): Promise<User | undefined>;
  findByName(name: string): Promise<User[] | undefined>;
  addImage(imageUrl: string, userId: string): Promise<void>;
  checkIfExistsByEmail(email: string): Promise<boolean>;
  checkIfExistsByPhone(phone: string): Promise<boolean>;
  update(data:{
    email?: string
    name?: string
    profileImage?:string
    id: string
  }):Promise<void>
}
