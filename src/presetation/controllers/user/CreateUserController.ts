import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ValidationError } from "@/_shared/errors/Errors";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import CreateUserUseCase from "@/usecase/user/create/CreateUseUseCase";
export class CreateUserController implements ControllerInterface {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

   async handle(
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<Response | undefined> {
    try {
      if (!Object.keys(request?.body).length)
        throw new ValidationError("Body is required");
      yup
        .object()
        .shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
          passwordConfirmation: yup.string().min(6).required(),
          name: yup.string().required(),
        })
        .validateSync(request.body, { abortEarly: false });

      const result = await this.createUserUseCase.execute({
        email: request.body.email,
        password: request.body.password,
        passwordConfirmation: request.body.passwordConfirmation,
        name: request.body.name,
 
      });
      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
