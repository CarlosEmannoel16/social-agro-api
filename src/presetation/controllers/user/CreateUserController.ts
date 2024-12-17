import { Request, Response } from "express";
import { ControllerProtocol } from "../@shared/ControllerProtocol";
import * as yup from "yup";
import { handlerErrorsController } from "@/presetation/helpers/handlerErrosController";
import { ValidationError } from "@/_shared/errors/Errors";
import { CreateUserUseCaseProtocol } from "@/usecase/user/create/CreateUserUseCaseProtocol";
export class CreateUserController implements ControllerProtocol {
  constructor(private readonly createUserUseCase: CreateUserUseCaseProtocol) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      if (!Object.keys(request?.body).length)
        throw new ValidationError("Body is required");
      yup
        .object()
        .shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
          passwordConfirmation: yup.string().min(6).required(),
          dateOfBirth: yup.date().required(),
          name: yup.string().required(),
        })
        .validateSync(request.body, { abortEarly: false });

      const result = await this.createUserUseCase.execute({
        email: request.body.email,
        password: request.body.password,
        passwordConfirmation: request.body.passwordConfirmation,
        name: request.body.name,
        imageUrl: request?.file?.path || "",
      });
      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(500).json(handlerErrorsController(error));
    }
  }
}
