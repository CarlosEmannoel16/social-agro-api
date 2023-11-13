import { UserFactory } from "../../../domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { InputUpdateUserDTO, OutputUpdateUserDTO } from "./UpdateUserDTO";
import { UpdateUserProtocolUseCase } from "./UpdateUserProtocolUseCase";

export class UpdateUserUseCase implements UpdateUserProtocolUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}
  async execute(data: InputUpdateUserDTO): Promise<OutputUpdateUserDTO> {
    const user = await this.userRepository.find(data.id);
    if (!user) throw new Error("User not found");

    const userFromUpdate = UserFactory.createNewUser({
      email: data.email,
      name: data.name,
      password: data.password,
    });

    await this.userRepository.update(userFromUpdate);
    return userFromUpdate
  }
}
