import { UserFactory } from "../../../domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { InputUpdateUserDTO, OutputUpdateUserDTO } from "./DTOs";

export class UpdateUserUseCase  {
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
    return {
      email: userFromUpdate.email, id: userFromUpdate.id, name: userFromUpdate.name

    }
  }
}
