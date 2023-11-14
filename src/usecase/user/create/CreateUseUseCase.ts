import { UserFactory } from "../../../domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { InputCreateUserDTO, OutputCreateUserDTO } from "./CreateUserDTO";

export default class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(data: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    const user = UserFactory.createNewUser(
     {
      email: data.email,
      name: data.name,
      password: data.password,
     }
    );

    const userWithEmail = await this.userRepository.findByEmail(user.email);
    if (userWithEmail) throw new Error("Email informado não está disponível");

    await this.userRepository.create(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
