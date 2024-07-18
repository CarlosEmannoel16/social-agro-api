import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import { AuthenticationUseCaseProtocol } from "../../../protocols/usecases/auth/AutheticationUseCase";
import * as yup from "yup";
export class AuthenticationController implements ControllerProtocol {
  constructor(
    private readonly authenticationUseCase: AuthenticationUseCaseProtocol
  ) {}
  async handle(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    try {
      console.log(request.body);

      yup
        .object()
        .shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        })
        .validateSync(request.body, { abortEarly: false });

      const { email, password } = request.body;

      const result = await this.authenticationUseCase.execute({
        email,
        password,
      });
      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: error });
    }
  }
}
