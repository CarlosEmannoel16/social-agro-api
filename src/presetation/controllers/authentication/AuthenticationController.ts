import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { AuthenticationUseCaseProtocol } from "../../../protocols/usecases/auth/AutheticationUseCase";

export class AuthenticationController implements ControllerProtocol {
  constructor(
    private readonly authenticationUseCase: AuthenticationUseCaseProtocol
  ) {}
  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { email, password } = request.body;
      console.log(email, password);
      if (email.length > 100)
        return response
          .status(400)
          .json({ message: "Ocorreu um erro ao realizar o login" });
      const result = await this.authenticationUseCase.execute({
        email,
        password,
      });
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }
}
