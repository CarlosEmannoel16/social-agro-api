import { Request, Response } from "express";
import * as yup from "yup";
import { handlerErrorsController } from "@/presetation/helpers/handlerErrosController";
import { ValidationError } from "@/_shared/errors/Errors";
import { ControllerInterface } from "@/_shared/interfaces/ControllerInterface";
import { UpdateUserUseCase } from "@/usecase/user/update/UpdateUseCase";
export class UpdateUserController implements ControllerInterface {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      if (!Object.keys(request?.body).length)
        throw new ValidationError("Body is required");

      console.log(request?.body)

      console.log(request?.file)

      const result = await this.updateUserUseCase.execute({
        email: request.body.email,
        name: request.body.name,
        profileImage: request?.file?.filename || "",
        id: request.headers["userId"] as string
      });
      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(500).json(handlerErrorsController(error));
    }
  }
}
