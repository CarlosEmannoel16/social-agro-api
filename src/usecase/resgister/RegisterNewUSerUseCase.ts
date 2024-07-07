import { UserFactory } from "@/domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "@/domain/user/repository/UserRepositoryInterface";

export type InputRegisterNewUserUseCase = {
  email: string;
  name: string;
  password: string;
  phone: string;
};
export class RegisterNewUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async handle(params: InputRegisterNewUserUseCase) {
    const existsEmail = await this.userRepository.checkIfExistsByEmail(
      params.email
    );

    if (existsEmail) throw new Error("Email already exists");

    const existsPhone = await this.userRepository.checkIfExistsByPhone(
      params.phone
    );

    if (existsPhone) throw new Error("Phone already exists");

    const user = UserFactory.createNewUser({
      email: params.email,
      name: params.name,
      password: params.password,
    });

    await this.userRepository.create(user);
  }
}
