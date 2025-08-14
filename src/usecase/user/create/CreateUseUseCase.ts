import { IGenerateTokenService } from "@/domain/user/services/GenerateTokenService";
import { UserFactory } from "../../../domain/user/factory/UserFactory";
import { UserRepositoryInterface } from "../../../domain/user/repository/UserRepositoryInterface";
import { InputCreateUserDTO, OutputCreateUserDTO } from "./DTOs";
import { IValidadeUserEmail } from "@/domain/user/services/ValidateUserEmail";

export default class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly generateTokenService: IGenerateTokenService,
    private readonly validateUserEmail: IValidadeUserEmail
  ) {}
  async execute(data: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    const user = UserFactory.createNewUser({
      email: data.email,
      name: data.name,
      password: data.password,
    });

    await this.validateUserEmail.execute(user.email);
    await this.userRepository.create(user);
    const token = this.generateTokenService.execute({
      id: user.id,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}
