import { UserRepositoryInterface } from "@/domain/user/interfaces/UserRepositoryInterface";

export type InputRegisterNewUserUseCase = {
  email: string;
  name: string;
  password: string;
  phone: string;
  passwordConfirmation: string;
};
export class RegisterNewUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async handle(params: InputRegisterNewUserUseCase) {
    if (params.password !== params.passwordConfirmation)
      throw new Error("Password and password confirmation must be the same");
    const existsEmail = await this.userRepository.checkIfExistsByEmail(
      params.email
    );

    if (existsEmail) throw new Error("Email already exists");

    await this.userRepository.create({
      name: params.name,
      email: params.email,
      password: params.password,
      confirmPassword: params.passwordConfirmation,
    });
  }
}
