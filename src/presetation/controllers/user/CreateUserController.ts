import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControlerProtocol";
import { CreateUserUseCaseProtocol } from "../../../protocols/usecases/user/CreateUserUseCaseProtocol";

export class CreateUserController implements ControllerProtocol {
  constructor(private readonly createUserUseCase: CreateUserUseCaseProtocol) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
    
      const result = await this.createUserUseCase.execute({
        email: request.body.email,
        password: request.body.password,
        name: request.body.name,
      });
      return response.status(201).json(result);
    } catch (error) {
      return response.status(500).json({ message: "Internal Error" });
    }
  }
}
