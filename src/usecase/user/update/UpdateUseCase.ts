import { UserFactory } from "../../../domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { InputUpdateUserDTO, OutputUpdateUserDTO } from "./DTOs";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}
  async execute(data: InputUpdateUserDTO): Promise<void> {
    const user = await this.userRepository.find(data.id);
    if (!user) throw new Error("User not found");

    await this.userRepository.update({
      id: data.id,
      email: data.email,
      name: data.name,
      profileImage: data.profileImage,
    });
  }
}
