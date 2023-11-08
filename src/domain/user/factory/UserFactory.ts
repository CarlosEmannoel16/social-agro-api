import { User } from "../entity/User";
import { v4 as UUIDV4 } from "uuid";
export class UserFactory {
  static createNewUser(name: string, email: string, password: string) {
    return new User(UUIDV4(), name, email, password, new Date(), new Date());
  }
}
