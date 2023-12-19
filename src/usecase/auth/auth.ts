import { Request, Response } from "express";
import { AuthenticationUseCaseProtocol } from "../../protocols/usecases/auth/AutheticationUseCase";
import { InputAuthUseCase, OutputAuthUseCase } from "./authDTO";
import { UserRepositoryInterface } from "../../domain/user/repository/UserRepositoryInterface";
import jwt from "jsonwebtoken";

export class AuthUseCase implements AuthenticationUseCaseProtocol {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(input: InputAuthUseCase): Promise<OutputAuthUseCase> {
    const privateKey = "eee88@09955%$#/";

    const user = await this.userRepository.findByEmail(input.email);
    console.log(user);
    if (!user) throw new Error("Email ou senha incorretos");

    const isCorrectPassword = user.password.trim() === input.password.trim();
    if (!isCorrectPassword) throw new Error("Email ou senha incorretos");


    const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey,
      { expiresIn: "48h", algorithm: "HS256" }
    )

   
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
