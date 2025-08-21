import { IGenerateTokenService } from "@/domain/user/services/GenerateTokenService";
import { UserRepositoryInterface } from "../../../domain/user/interfaces/UserRepositoryInterface";
import { InputCreateUserDTO, OutputCreateUserDTO } from "./DTOs";
import { IValidadeUserEmail } from "@/domain/user/services/ValidateUserEmail";

export default class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly generateTokenService: IGenerateTokenService,
    private readonly validateUserEmail: IValidadeUserEmail
  ) {}
  async execute(data: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    await this.validateUserEmail.execute(data.email);

    if(data.passwordConfirmation !== data.password){
      throw new Error('As senhas não conferem')
    }
    const response = await this.userRepository.create({
      password: data.password,
      confirmPassword: data.passwordConfirmation,
      email: data.email,
      name: data.name,
    });
    const token = this.generateTokenService.execute({
      id: response?.id,
    });

    return {
      id: response.id,
      name: response.name,
      email: response.email,
      token,
    };
  }
}
