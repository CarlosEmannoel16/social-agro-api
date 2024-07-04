import { User } from "../entity/User";
import { v4 } from "uuid";
import { InputCreateUserFactory } from "./UserFactoryTypes";
export class UserFactory {
  static createNewUser({
    email,
    name,
    password,
    id = v4(),
  }: InputCreateUserFactory) {
    return new User(
      id,
      name,
      email,
      password,
      new Date(),
      new Date(),
      new Date()
    );
  }
}
