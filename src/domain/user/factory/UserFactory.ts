import { User } from "../entity/User";
import { v4 as UUIDV4 } from "uuid";
import { InputCreateUserFactory } from "./UserFactoryTypes";
export class UserFactory {
  static createNewUser({email, name, password}: InputCreateUserFactory) {
    return new User(UUIDV4(), name, email, password, new Date(), new Date());
  }
}
