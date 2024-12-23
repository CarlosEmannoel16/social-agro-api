import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { InputFindUserDTO, OutputFindUserDTO } from "./DTOs";

export default class FindUserUseCase  {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(input: InputFindUserDTO): Promise<OutputFindUserDTO> {
    const user = await this.userRepository.find(input.id);

    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      name: user.name,
      updatedAt: user.updatedAt,
    };
  }
}
