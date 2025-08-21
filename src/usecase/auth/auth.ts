import { InputAuthUseCase, OutputAuthUseCase } from "./authDTO";
import { UserRepositoryInterface } from "../../domain/user/interfaces/UserRepositoryInterface";
import jwt from "jsonwebtoken";
import { ValidationError } from "@/_shared/errors/Errors";

export class AuthUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(input: InputAuthUseCase): Promise<OutputAuthUseCase> {
    const privateKey = "eee88@09955%$#/";

    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new ValidationError("Email ou senha incorretos");

    const isCorrectPassword = user.password.trim() === input.password.trim();
    if (!isCorrectPassword) throw new ValidationError("Email ou senha incorretos");

    const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey,
      { expiresIn: "48h", algorithm: "HS256" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
